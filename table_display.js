/****************************************************************************************//**
* \file table_display.js																    *
* \brief Javascript functions for the basic table display.                                  *
*                                                                                           *
*   \version 3.2.0                                                                          *
*                                                                                           *
*   This file is part of the BMLT Common Satellite Base Class Project. The project GitHub   *
*   page is available here: https://github.com/MAGSHARE/BMLT-Common-CMS-Plugin-Class        *
*                                                                                           *
*   This file is part of the Basic Meeting List Toolbox (BMLT).                             *
*                                                                                           *
*   Find out more at: http://bmlt.magshare.org                                              *
*                                                                                           *
*   BMLT is free software: you can redistribute it and/or modify                            *
*   it under the terms of the GNU General Public License as published by                    *
*   the Free Software Foundation, either version 3 of the License, or                       *
*   (at your option) any later version.                                                     *
*                                                                                           *
*   BMLT is distributed in the hope that it will be useful,                                 *
*   but WITHOUT ANY WARRANTY; without even the implied warranty of                          *
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                           *
*   GNU General Public License for more details.                                            *
*                                                                                           *
*   You should have received a copy of the GNU General Public License                       *
*   along with this code.  If not, see <http://www.gnu.org/licenses/>.                      *
********************************************************************************************/

/****************************************************************************************//**
*	\brief  
********************************************************************************************/
function TableSearchDisplay (   in_display_id,      ///< The element DOM ID of the container div.
                                in_settings_id,     ///< The ID of the settings used for this table.
                                in_ajax_base_uri,   ///< The base URI for AJAX callbacks.
                                in_start_weekday,   ///< The weekday that starts the week. 0 is Sunday, 6 is Saturday.
                                in_search_params    ///< The query parameters for the base search.
                            )
{
	/****************************************************************************************
	*									INSTANCE DATA MEMBERS								*
	****************************************************************************************/

	var my_settings_id;         ///< This is the unique ID of the BMLT settings that we use to reference default values.
	var my_ajax_base_uri;       ///< This is the base URI for our AJAX calls.
	var my_search_query_params; ///< These are the search parameters that we use to populate the search.
	var my_start_weekday;       ///< The day of week that starts the header (0 is Sunday, 6 is Saturday).
	
	var my_container_object;    ///< This is the div block that surrounds this table.
	var my_header_container;    ///< The div element that will contain the weekday tabs.
	var my_weekday_links;       ///< An array of anchor elements, containing the weekday tabs
	
    /****************************************************************************************
    *								  INTERNAL CLASS FUNCTIONS							    *
    ****************************************************************************************/
	
    /****************************************************************************************
    *#################################### UTILITY ROUTINES #################################*
    ****************************************************************************************/
    /************************************************************************************//**
    *                                     AJAX HANDLER                                      *
    ****************************************************************************************/

    /************************************************************************************//**
    *   \brief A simple, generic AJAX request function.                                     *
    *                                                                                       *
    *   \returns a new XMLHTTPRequest object.                                               *
    ****************************************************************************************/
    
    this.utility_AjaxRequest = function (   url,        ///< The URI to be called
                                            callback,   ///< The success callback
                                            method,     ///< The method ('get' or 'post')
                                            extra_data  ///< If supplied, extra data to be delivered to the callback.
                                        )
    {
        /********************************************************************************//**
        *   \brief Create a generic XMLHTTPObject.                                          *
        *                                                                                   *
        *   This will account for the various flavors imposed by different browsers.        *
        *                                                                                   *
        *   \returns a new XMLHTTPRequest object.                                           *
        ************************************************************************************/
    
        function createXMLHTTPObject()
        {
            var XMLHttpArray = [
                function() {return new XMLHttpRequest()},
                function() {return new ActiveXObject("Msxml2.XMLHTTP")},
                function() {return new ActiveXObject("Msxml2.XMLHTTP")},
                function() {return new ActiveXObject("Microsoft.XMLHTTP")}
                ];
            
            var xmlhttp = false;
        
            for ( var i=0; i < XMLHttpArray.length; i++ )
                {
                try
                    {
                    xmlhttp = XMLHttpArray[i]();
                    }
                catch(e)
                    {
                    continue;
                    };
                break;
                };
        
            return xmlhttp;
        };
    
        var req = createXMLHTTPObject();
        req.finalCallback = callback;
        var sVars = null;
        method = method.toString().toUpperCase();
        var drupal_kludge = '';
    
        // Split the URL up, if this is a POST.
        if ( method == "POST" )
            {
            var rmatch = /^([^\?]*)\?(.*)$/.exec ( url );
            url = rmatch[1];
            sVars = rmatch[2];
            // This horrible, horrible kludge, is because Drupal insists on having its q parameter in the GET list only.
            var rmatch_kludge = /(q=admin\/settings\/bmlt)&?(.*)/.exec ( rmatch[2] );
            if ( rmatch_kludge && rmatch_kludge[1] )
                {
                url += '?'+rmatch_kludge[1];
                sVars = rmatch_kludge[2];
                };
            };
        if ( extra_data )
            {
            req.extra_data = extra_data;
            };
        req.open ( method, url, true );
        if ( method == "POST" )
            {
            req.setRequestHeader("Method", "POST "+url+" HTTP/1.1");
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            };
        req.onreadystatechange = function ( )
            {
            if ( req.readyState != 4 ) return;
            if( req.status != 200 ) return;
            callback ( req, req.extra_data );
            req = null;
            };
        req.send ( sVars );
    
        return req;
    };
    
    /************************************************************************************//**
    *	\brief  Called to load a weekday.
    *           This is called when the tab doesn't yet have a cache.
    ****************************************************************************************/
	this.utility_loadWeekdayData = function ( in_weekday_index  ///< An integer, with the weekday to be loaded (0 is Sunday, 6 is Saturday).
	                                        )
	{
	    var uri = encodeURI ( this.my_search_query_params + '&bmlt_settings_id=' + this.my_settings_id + '&weekdays[]=' + in_weekday_index.toString() ).toString();
	    uri =  this.my_ajax_base_uri + '?redirect_ajax_json=' + uri;
        this.m_ajax_request = this.utility_AjaxRequest ( uri, this.callback_loadWeekdayData, 'get', parseInt (in_weekday_index) + 1 );
	};
	
    /****************************************************************************************
    *##################################### AJAX CALLBACKS ##################################*
    ****************************************************************************************/
    /************************************************************************************//**
    *	\brief  Called when the weekday data is loaded.
    *           This loads the tab object with a cache of the retrieved JSON data, and has
    *           the tab object select itself.
    ****************************************************************************************/
	this.callback_loadWeekdayData = function (  in_response_object, ///< The HTTPRequest response object.
                                                in_weekday_index    ///< The weekday index, plus one (because JS likes to undefine zeroes).
                                             )
    {
        in_weekday_index--; // Undo the +1
        eval ( "var json_response = " + in_response_object.responseText + ";" );    // Extract the JSON object with the returned data.
        var tabElementID = 'bmlt_table_header_weekday_list_element' + in_weekday_index.toString();
        var tabObject = document.getElementById ( tabElementID );
        tabObject.json_data = json_response;
        tabObject.select();
    };
    
    /****************************************************************************************
    *################################# INITIAL SETUP ROUTINES ##############################*
    ****************************************************************************************/
    /************************************************************************************//**
    *	\brief Creates the weekday selection header.
    ****************************************************************************************/
    this.domBuilder_CreateHeader = function ()
    {
        // Clear out any previous ones.
        if ( this.my_weekday_links && this.my_weekday_links.length )
            {
            for ( var i = this.my_weekday_links.length; i > 0; )
                {
                i--;
                this.my_weekday_links[i].parentNode.removeChild ( this.my_weekday_links[i] );
                this.my_weekday_links[i].innerHTML = null
                this.my_weekday_links[i] = null;
                };
            };
        
        if ( this.my_header_container )
            {
            this.my_header_container.parentNode.removeChild ( this.my_header_container );
            this.my_header_container.innerHTML = null;
            this.my_header_container = null;
            };
        
        this.my_weekday_links = new Array();
        this.my_header_container = document.createElement ( 'ul' );   // Create the header container.
        this.my_header_container.handler = this;
        this.my_header_container.className = 'bmlt_table_header_weekday_list';
        var startingIndex = this.my_start_weekday;
        
        // Build the list of weekday tab objects.
        for ( var i = 0; i < 7; i++ )
            {
            this.my_weekday_links[i] = this.domBuilder_CreateOneWeekday ( startingIndex++ );
            if ( startingIndex == 7 )
                {
                startingIndex = 0;
                };
        
            this.my_header_container.appendChild ( this.my_weekday_links[i] );
            };
        
        // This inline function tells the header to select the indexed (0-based) tab.
        this.my_header_container.selectTab = function ( in_weekday  ///< The day of the week (0 is Sunday, 6 is Saturday)
                                                        )
            {
            for ( var i = 0; i < 7; i++ )
                {
                if ( this.handler && this.handler.my_weekday_links && this.handler.my_weekday_links[i] )
                    {
                    // If the indexed object is not ours, then we deselect it.
                    if ( this.handler.my_weekday_links[i].index == in_weekday )
                        {
                        this.handler.my_weekday_links[i].select();
                        };
                    };
                };
            };
        
        this.my_container_object.appendChild ( this.my_header_container );
        var d = new Date();
        this.my_header_container.selectTab ( d.getDay() );
    };
    
    /************************************************************************************//**
    *	\brief Creates one weekday button for the header.
    ****************************************************************************************/
    this.domBuilder_CreateOneWeekday = function ( in_weekday_index  ///< The index of the weekday to be created. 0 is Sunday, 6 is Saturday.
                                                )
    {
        var weekdayElement = document.createElement ( 'li' );        // Create the basic anchor element.
        // Add the text for it.
        weekdayElement.handler = this;
        weekdayElement.index = in_weekday_index;
        weekdayElement.id = 'bmlt_table_header_weekday_list_element' + in_weekday_index.toString();
        weekdayElement.className = 'bmlt_table_header_weekday_list_element';
        weekdayElement.onclick = function () {this.select()};

        var textNode = document.createElement ( 'span' );
        textNode.appendChild ( document.createTextNode ( g_table_weekday_long_array[in_weekday_index] ) );
        textNode.className = 'bmlt_table_weekday_span';
        weekdayElement.appendChild ( textNode );
        
        var throbberImage = document.createElement ( 'img' );   // This will be the throbber.
        throbberImage.src = g_table_throbber_img_src;
        throbberImage.className = 'bmlt_table_throbber_image';
        weekdayElement.appendChild ( throbberImage );
        
        // This inline function will read the data from the server if it is not already cached.
        // If the tab has cached data, then it deselects all the other tabs, selects itself, and populates the main area with the data in its cache.
        weekdayElement.select = function()
            {
            if ( !this.json_data )
                {
                this.className = 'bmlt_table_header_weekday_list_element is_loading';
                this.handler.utility_loadWeekdayData ( this.index );
                }
            else
                {
                for ( var i = 0; i < 7; i++ )
                    {
                    if ( this.handler && this.handler.my_weekday_links && this.handler.my_weekday_links[i] )
                        {
                        // If the indexed object is not ours, then we deselect it.
                        if ( this.handler.my_weekday_links[i].index != this.index )
                            {
                            this.handler.my_weekday_links[i].className = 'bmlt_table_header_weekday_list_element';
                            };
                        };
                    };
                this.className = 'bmlt_table_header_weekday_list_element is_selected';
                };
            };
        
        return weekdayElement;
    };
    
    /****************************************************************************************
    *##################################### UI RESPONDERS ###################################*
    ****************************************************************************************/
    
    /****************************************************************************************
    *################################### MAIN FUNCTION CODE ################################*
    ****************************************************************************************/
    
    this.my_container_object = document.getElementById ( in_display_id );
    this.my_container_object.handlerObject = this;
    
    this.my_settings_id = in_settings_id;
    this.my_ajax_base_uri = in_ajax_base_uri;
    this.my_start_weekday = in_start_weekday;
    this.my_search_query_params = in_search_params;

    this.domBuilder_CreateHeader();
};
