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
                                in_is_military_time,    ///< True, if the time is to be displayed as military.
                                in_search_params    ///< The query parameters for the base search.
                            )
{
	/****************************************************************************************
	*									INSTANCE DATA MEMBERS								*
	****************************************************************************************/

	var my_settings_id;             ///< This is the unique ID of the BMLT settings that we use to reference default values.
	var my_ajax_base_uri;           ///< This is the base URI for our AJAX calls.
	var my_search_query_params;     ///< These are the search parameters that we use to populate the search.
	var my_start_weekday;           ///< The day of week that starts the header (0 is Sunday, 6 is Saturday).
	var my_military_time;           ///< True, if the start time is military.
	
	var my_container_object;        ///< This is the div block that surrounds this table.
	var my_header_container;        ///< The div element that will contain the weekday tabs.
	var my_body_container;          ///< The table element that will contain the search results.
	var my_body_container_header;   ///< The table thead element that will contain the search results.
	var my_body_container_body;     ///< The table tbody element that will contain the search results.
	var my_weekday_links;           ///< An array of li elements, containing the weekday tabs
	var my_selected_tab;            ///< This will be the selected tab object.
	
	var my_format_data;             ///< This is the JSON object that contains the format data for the search.
	
	var my_sort_key_time;           ///< The sort keys for sorting by start time.
	var my_sort_key_meeting_name;   ///< The sort keys for sorting by meeting name.
	var my_sort_key_town;           ///< The sort keys for sorting by borough/town.
	var my_sort_key_address;        ///< The sort keys for sorting by street address/location name.
	var my_selected_sort_key;       ///< The currently selected sort key.
	var my_sort_dir;                ///< The currently selected sort direction.
	
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
	this.utility_loadWeekdayData = function (   in_tab_object       ///< The tab object.
	                                        )
	{
	    var uri = encodeURI ( this.my_search_query_params + '&sort_keys=' + this.my_selected_sort_key  + ((this.my_sort_dir == 'desc') ? ',desc' : '') +'&bmlt_settings_id=' + this.my_settings_id + '&weekdays[]=' + (parseInt (in_tab_object.index) + 1).toString() ).toString();
	    uri =  this.my_ajax_base_uri + encodeURI ( 'switcher=GetSearchResults&' ) + uri;
        this.m_ajax_request = this.utility_AjaxRequest ( uri, this.callback_loadWeekdayData, 'get', in_tab_object );
	};
    
    /************************************************************************************//**
    *	\brief  Called to load all the format objects for the search.
    ****************************************************************************************/
	this.utility_loadFormatData = function()
	{
	    for ( var i = 0; i < 7; i++ )
	        {
	        var tab_object = this.my_weekday_links[i];
	        tab_object.className = 'bmlt_table_header_weekday_list_element is_loading';
	        };
	    
	    var uri = encodeURI ( this.my_search_query_params + '&bmlt_settings_id=' + this.my_settings_id + '&get_formats_only=1' ).toString();
	    uri =  this.my_ajax_base_uri + encodeURI ( 'switcher=GetSearchResults&' ) + uri;
        this.m_ajax_request = this.utility_AjaxRequest ( uri, this.callback_loadFormatData, 'get' );
	};
	
    /************************************************************************************//**
    *	\brief  This turns military time to ante meridian format.
    ****************************************************************************************/
	this.utility_convertTime = function ( in_time_string  ///< A string with the time in military format.
	                                        )
	{
	    var ret = in_time_string;
	    var time_array = in_time_string.split ( ":" );
	    
	    if ( !this.my_military_time )
	        {
	        var ampm = g_table_ampm_array[0];
	        
	        var hours = parseInt ( time_array[0] );
	        var minutes = parseInt ( time_array[1] ).toString();
	        
	        if ( parseInt ( time_array[1] ) < 10 )
	            {
	            minutes = "0" + minutes;
	            };
	        
	        if ( hours > 12 )
	            {
	            hours -= 12;
	            ampm = g_table_ampm_array[1];
	            }
	        else if ( hours == 12 )
	            {
	            if ( (parseInt ( time_array[0] ) == 12) && (parseInt ( time_array[1] ) == 0) )
	                {
	                hours = g_table_ampm_array[2];
	                minutes = "";
	                ampm = "";
	                }
	            else
	                {
	                ampm = g_table_ampm_array[1];
	                };
	            }
	        else if ( (parseInt ( time_array[0] ) == 23) && (parseInt ( time_array[1] ) >= 55) )
	            {
                hours = g_table_ampm_array[3];
                minutes = "";
                ampm = "";
	            };
	        
	        ret = hours.toString() + ((minutes != "") ? (':' + minutes + ' ' + ampm) : "");
	        }
	    else if ( (parseInt ( time_array[0] ) == 12) && (parseInt ( time_array[1] ) == 0) )
            {
            ret = g_table_ampm_array[2];
            }
	    else if ( (parseInt ( time_array[0] ) == 23) && (parseInt ( time_array[1] ) >= 55) )
            {
            ret = g_table_ampm_array[3];
            };
        
        return ret;
	};
	
    /************************************************************************************//**
    *	\brief  This builds a readable aggregated street address from the components in the JSON.
    ****************************************************************************************/
	this.utility_createStreetAddress = function ( in_json_data    ///< The JSON data for one meeting.
	                                        )
	{
	    var ret = '';

	    if ( in_json_data.location_text && in_json_data.location_text.toString() )
	        {
	        ret = in_json_data.location_text.toString();
	        };
	    
	    if ( in_json_data.location_street && in_json_data.location_street.toString() )
	        {
	        if ( ret != '' )
	            {
	            ret += ', ';
	            };
	        
	        ret += in_json_data.location_street.toString();
	        };
	        
	    return ret;
	};
	
    /************************************************************************************//**
    *	\brief  This builds an aggregated town from the components in the JSON.
    ****************************************************************************************/
	this.utility_createAddressTown = function ( in_json_data    ///< The JSON data for one meeting.
	                                        )
	{
	    var ret = '';
	    
	    if ( in_json_data.location_city_subsection && in_json_data.location_city_subsection.toString() )
	        {
	        if ( ret != '' )
	            {
	            ret += ', ';
	            };
	        
	        ret += in_json_data.location_city_subsection.toString();
	        }
	    else
	        {
            if ( in_json_data.location_municipality && in_json_data.location_municipality.toString() )
                {
                if ( ret != '' )
                    {
                    ret += ', ';
                    };
            
                ret += in_json_data.location_municipality.toString();
                };
            };
        
	    if ( in_json_data.location_province && in_json_data.location_province.toString() )
	        {
	        if ( ret != '' )
	            {
	            ret += ', ';
	            };
	        
	        ret += in_json_data.location_province.toString();
	        };
	        
	    return ret;
	};
	
    /************************************************************************************//**
    *	\brief  This builds an aggregated address for map lookup from the components in the JSON.
    ****************************************************************************************/
	this.utility_createMapAddress = function ( in_json_data    ///< The JSON data for one meeting.
	                                        )
	{
	    var ret = '';

	    if ( in_json_data.location_street && in_json_data.location_street.toString() )
	        {
	        ret += in_json_data.location_street.toString();
	        };
	    
	    if ( in_json_data.location_city_subsection && in_json_data.location_city_subsection.toString() )
	        {
	        if ( ret != '' )
	            {
	            ret += ', ';
	            };
	        
	        ret += in_json_data.location_city_subsection.toString();
	        }
	    else
	        {
            if ( in_json_data.location_municipality && in_json_data.location_municipality.toString() )
                {
                if ( ret != '' )
                    {
                    ret += ', ';
                    };
            
                ret += in_json_data.location_municipality.toString();
                };
            };
        
	    if ( in_json_data.location_province && in_json_data.location_province.toString() )
	        {
	        if ( ret != '' )
	            {
	            ret += ', ';
	            };
	        
	        ret += in_json_data.location_province.toString();
	        };
        
	    if ( in_json_data.location_postal_code_1 && in_json_data.location_postal_code_1.toString() )
	        {
	        if ( ret != '' )
	            {
	            ret += ' ';
	            };
	        
	        ret += in_json_data.location_postal_code_1.toString();
	        };
	        
	    return ret;
	};
	
    /************************************************************************************//**
    *	\brief  This builds a div element for the given formats.
    ****************************************************************************************/
	this.utility_createFormats = function ( in_formats_string    ///< The JSON data for one meeting.
	                                        )
	{
	    var ret = document.createElement ( 'div' );
	    ret.className = 'bmlt_formats_div';
	    var formatsArray = in_formats_string.split ( ',' );
	    
	    for ( var i = 0; i < formatsArray.length; i++ )
	        {
	        var format_string = formatsArray[i].toString();
	        var span = this.utility_createOneFormatSpan ( format_string );
	        if ( span )
	            {
	            ret.appendChild ( span );
	            };
	        };
	    
	    if ( ret.childNodes.length == 0 )
	        {
	        ret = null;
	        };
	    
	    return ret;
	};
	
    /************************************************************************************//**
    *	\brief  This builds a span element for the given formats.
    ****************************************************************************************/
	this.utility_createOneFormatSpan = function ( in_format_string    ///< The JSON data for one format.
	                                        )
	{
	    if ( in_format_string )
	        {
            var ret = document.createElement ( 'span' );
            ret.className = 'bmlt_format_span bmlt_format_span_' + in_format_string;
            ret.appendChild ( document.createTextNode ( in_format_string ) );
            for ( var i = 0; i < this.my_format_data.length; i++ )
                {
                var format_object = this.my_format_data[i];
                
                if ( format_object.key_string == in_format_string )
                    {
                    var title_string = format_object.name_string;
                    ret.setAttribute ( 'title', title_string );
                    var description_string = format_object.description_string;
                    ret.onclick = function() { alert ( description_string ); };
                    };
                };
            return ret;
            };
        
        return null;
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
                                                in_tab_object       ///< The weekday index, plus one (because JS likes to undefine zeroes).
                                             )
    {
        eval ( "var json_response = " + in_response_object.responseText + ";" );    // Extract the JSON object with the returned data.
        in_tab_object.json_data = json_response;
        in_tab_object.select();
    };
    
    /************************************************************************************//**
    *	\brief  Called when the weekday data is loaded.
    *           This loads the tab object with a cache of the retrieved JSON data, and has
    *           the tab object select itself.
    ****************************************************************************************/
	this.callback_loadFormatData = function (   in_response_object ///< The HTTPRequest response object.
                                             )
    {
	    for ( var i = 0; i < 7; i++ )
	        {
	        var tab_object = this.my_weekday_links[i];
	        tab_object.className = 'bmlt_table_header_weekday_list_element';
	        };
	    
        eval ( "this.my_format_data = " + in_response_object.responseText + ";" );    // Extract the JSON object with the returned data.
        this.my_format_data = this.my_format_data.formats;
        var d = new Date();
        this.my_header_container.selectTab ( d.getDay() );
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
                this.my_weekday_links[i].innerHTML = null;
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
        this.utility_loadFormatData();
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
        weekdayElement.className = 'bmlt_table_header_weekday_list_element';
        
        var d = new Date();
        if ( d.getDay() == in_weekday_index )
            {
            weekdayElement.className += ' is_today';
            };
        
        weekdayElement.onclick = function () {this.select()};

        var textNode = document.createElement ( 'span' );
        textNode.appendChild ( document.createTextNode ( g_table_weekday_name_array[in_weekday_index] ) );
        textNode.className = 'bmlt_table_weekday_span';
        weekdayElement.appendChild ( textNode );
        
        var throbberImage = document.createElement ( 'img' );   // This will be the throbber.
        throbberImage.src = g_table_throbber_img_src;
        throbberImage.className = 'bmlt_table_throbber_image';
        weekdayElement.appendChild ( throbberImage );
        
        // This inline function will force a reload of the search for the given weekday.
        weekdayElement.reload = function()
            {
                if ( this.className != 'bmlt_table_header_weekday_list_element is_loading' )
                    {
                    if ( this.handler.my_body_container )   // Clear any preexisting condition.
                        {
                        this.handler.my_body_container.parentNode.removeChild ( this.handler.my_body_container );
                        this.handler.my_body_container.innerHTML = '';
                        this.handler.my_body_container = null;
                        };
                
                    this.json_data = null;
                    this.className = 'bmlt_table_header_weekday_list_element is_loading';
                    
                    // Set a title, saying what is happening.
                    this.setAttribute ( 'title', this.handler.sprintf ( g_table_header_tab_loading_format, g_table_weekday_long_name_array[this.index] ) );
                    
                    this.handler.utility_loadWeekdayData ( this );
                    };
            };
        
        // This inline function will read the data from the server if it is not already cached.
        // If the tab has cached data, then it deselects all the other tabs, selects itself, and populates the main area with the data in its cache.
        weekdayElement.select = function()
            {
            // We don't do anything if it is already selected, or is loading.
            if ( this.className != 'bmlt_table_header_weekday_list_element is_selected' )
                {
                if ( !this.json_data )
                    {
                    this.reload();
                    }
                else
                    {
                    if ( this.handler.my_body_container )   // Clear any preexisting condition.
                        {
                        this.handler.my_body_container.parentNode.removeChild ( this.handler.my_body_container );
                        this.handler.my_body_container.innerHTML = '';
                        this.handler.my_body_container = null;
                        };
        
                    var d = new Date();
                    for ( var i = 0; i < 7; i++ )
                        {
                        if ( this.handler && this.handler.my_weekday_links && this.handler.my_weekday_links[i] )
                            {
                            var tabObject = this.handler.my_weekday_links[i];
                            // If the indexed object is not ours, then we deselect it.
                            if ( tabObject.index != this.index )
                                {
                                // This is not selected or loading.
                                tabObject.className = 'bmlt_table_header_weekday_list_element';
                                // Set a title, saying what will happen when this is clicked.
                                tabObject.setAttribute ( 'title', this.handler.sprintf ( g_table_header_tab_format, g_table_weekday_long_name_array[tabObject.index] ) );
        
                                if ( d.getDay() == tabObject.index )
                                    {
                                    tabObject.className += ' is_today';
                                    };
                                };
                            };
                        };
                    
                    this.className = 'bmlt_table_header_weekday_list_element is_selected';
                    this.handler.my_selected_tab = this;
                    this.sort_key = this.handler.my_selected_sort_key;
                    this.sort_dir = this.handler.my_sort_dir;
                    if ( d.getDay() == this.index )
                        {
                        this.className += ' is_today';
                        };
                    this.handler.domBuilder_PopulateWeekday ( this.json_data, this.index, this.sort_key, this.sort_dir );
                    };
                };
            };
        
        return weekdayElement;
    };
    
    /************************************************************************************//**
    *	\brief Populates the meeting result table for the given data.
    ****************************************************************************************/
    this.domBuilder_PopulateWeekday = function (    in_search_results_json,     ///< A JSON object with the meeting search results.
	                                                in_index,                   ///< The 0-based weekday index.
	                                                in_sort_key,                ///< The sort key, for the data sort.
	                                                in_sort_dir                 ///< The sort direction, for the data sort. It will be 'asc' or 'desc'.
                                                )
    {
        if ( this.my_body_container )   // Clear any preexisting condition.
            {
            this.my_body_container_header.parentNode.removeChild ( this.my_body_container_header );
            this.my_body_container_header.innerHTML = '';
            this.my_body_container_header = null;
            this.my_body_container_body.parentNode.removeChild ( this.my_body_container_body );
            this.my_body_container_body.innerHTML = '';
            this.my_body_container_body = null;
            this.my_body_container.parentNode.removeChild ( this.my_body_container );
            this.my_body_container.innerHTML = '';
            this.my_body_container = null;
            };
        
        this.my_body_container = document.createElement ( 'table' );        // Create the main table element.
        this.my_body_container.cellPadding = 0;
        this.my_body_container.cellSpacing = 0;
        this.my_body_container.className = 'bmlt_table';
        var d = new Date();
        if ( d.getDay() == in_index )
            {
            this.my_body_container.className += ' is_today';
            };
        
        this.my_body_container.appendChild ( this.domBuilder_PopulateWeekdayHeader ( in_index, in_sort_key, in_sort_dir ) );
        this.my_body_container.appendChild ( this.domBuilder_PopulateWeekdayBody ( in_search_results_json ) );
        this.my_container_object.appendChild ( this.my_body_container );
    };
    
    /************************************************************************************//**
    *	\brief Populates the header for the meetings table.
    ****************************************************************************************/
    this.domBuilder_PopulateWeekdayHeader = function (  in_index,       ///< The 0-based weekday index.
	                                                    in_sort_key,    ///< The sort key, for the data sort.
	                                                    in_sort_dir     ///< The sort direction, for the data sort. It will be 'asc' or 'desc'.
                                                    )
    {
        this.my_body_container_header = document.createElement ( 'thead' );        // Create the header element.
        this.my_body_container_header.className = 'bmlt_table_header_thead';
        var headerRow = document.createElement ( 'tr' );        // Create the row tr element.
        headerRow.className = 'bmlt_table_header_tr';
        var thElement = this.domBuilder_PopulateWeekdayHeaderColumn ( g_table_time_header_text, this.my_sort_key_time, ((in_sort_key == this.my_sort_key_time) ? in_sort_dir : 'asc'), in_sort_key == this.my_sort_key_time );
        thElement.className = 'bmlt_table_header_th bmlt_table_header_th_time';
        headerRow.appendChild ( thElement );
        thElement = this.domBuilder_PopulateWeekdayHeaderColumn ( g_table_town_header_text, this.my_sort_key_town, ((in_sort_key == this.my_sort_key_town) ? in_sort_dir : 'asc'), in_sort_key == this.my_sort_key_town );
        thElement.className = 'bmlt_table_header_th bmlt_table_header_th_town';
        headerRow.appendChild ( thElement );
        thElement = this.domBuilder_PopulateWeekdayHeaderColumn ( g_table_name_header_text, this.my_sort_key_meeting_name, ((in_sort_key == this.my_sort_key_meeting_name) ? in_sort_dir : 'asc'), in_sort_key == this.my_sort_key_meeting_name );
        thElement.className = 'bmlt_table_header_th bmlt_table_header_th_name';
        headerRow.appendChild ( thElement );
        thElement = this.domBuilder_PopulateWeekdayHeaderColumn ( g_table_address_header_text, this.my_sort_key_address, ((in_sort_key == this.my_sort_key_address) ? in_sort_dir : 'asc'), in_sort_key == this.my_sort_key_address );
        thElement.className = 'bmlt_table_header_th bmlt_table_header_th_address';
        headerRow.appendChild ( thElement );
        thElement = this.domBuilder_PopulateWeekdayHeaderColumn ( g_table_format_header_text, null, null, false );
        thElement.className = 'bmlt_table_header_th bmlt_table_header_th_format';
        headerRow.appendChild ( thElement );
        this.my_body_container_header.appendChild ( headerRow );
        
        return this.my_body_container_header;
    };
    
    /************************************************************************************//**
    *	\brief Populates the header for the meetings table.
    ****************************************************************************************/
    this.domBuilder_PopulateWeekdayHeaderColumn = function (    in_name,        ///< The text name for the column.
	                                                            in_sort_key,    ///< The sort key, for the data sort.
	                                                            in_sort_dir,    ///< The sort direction, for the data sort. It will be 'asc' or 'desc'.
	                                                            in_is_selected  ///< A boolean value. True, if this is the sort key.
                                                            )
    {
        var thElement =  document.createElement ( 'th' );       // Create the column element
        thElement.key = in_sort_key;                            // This will be the sort key for this column.
        thElement.dir = in_is_selected ? in_sort_dir : 'asc';    // If we are specifying a sort direction for this column, we use that.
        var textNode = document.createElement ( 'span' );
        textNode.appendChild ( document.createTextNode ( in_name ) );
        textNode.is_selected = false;
        textNode.sort_dir = in_sort_dir;
        textNode.sort_key = in_sort_key;
        textNode.handler = this;
        if ( in_sort_key && in_is_selected )
            {
            var imgNode = document.createElement ( 'img' );
            imgNode.className = 'bmlt_table_thead_th_img bmlt_table_thead_th_img_' + ((in_sort_dir == 'asc') ? 'asc' : 'desc');
            imgNode.src = ((in_sort_dir == 'asc') ? g_table_sort_asc_img_src : g_table_sort_desc_img_src);
            textNode.appendChild ( imgNode );
            textNode.is_selected = true;
            };
        
        if ( in_sort_key )
            {
            textNode.onclick = function()
                {
                    if ( this.handler.my_selected_sort_key == this.sort_key )
                        {
                        this.sort_dir = ((this.sort_dir == 'asc') ? 'desc' : 'asc');
                        };
                
                    this.handler.my_selected_sort_key = this.sort_key;
                    this.handler.my_sort_dir = this.sort_dir;
                    for ( var i = 0; i < 7; i++ )
                        {
                        this.handler.my_weekday_links[i].json_data = null;
                        };
                    this.handler.my_selected_tab.reload();
                };
            }
        else
            {
            textNode.className = 'bmlt_header_formats_span';
            };
        
        thElement.appendChild ( textNode );

        return thElement;
    };
    
    /************************************************************************************//**
    *	\brief Populates the main table for the meetings table.
    ****************************************************************************************/
    this.domBuilder_PopulateWeekdayBody = function (  in_json_data  ///< The JSON data for the meetings.
                                                    )
    {
        this.my_body_container_body = document.createElement ( 'tbody' );        // Create the header element.
        this.my_body_container_body.className = 'bmlt_table_tbody';
        
        if ( in_json_data.length )
            {
            for ( var i = 0; i < in_json_data.length; i++ )
                {
                var meeting_json = in_json_data[i];
                var meeting_object = this.domBuilder_PopulateWeekdayBody_one_meeting ( meeting_json );
                meeting_object.className += (' bmlt_row' + ((i % 2) ? '_odd' : '_even'));
                this.my_body_container_body.appendChild ( meeting_object );
                };
            };
        
        return this.my_body_container_body;
    };
    
    /************************************************************************************//**
    *	\brief Populates one row 
    ****************************************************************************************/
    this.domBuilder_PopulateWeekdayBody_one_meeting = function (  in_json_data  ///< The JSON data for the meetings.
                                                                )
    {
        var rowElement = document.createElement ( 'tr' );
        rowElement.className = 'bmlt_table_tbody_tr';
        
        rowElement.appendChild ( this.domBuilder_PopulateWeekdayBody_one_column ( 'time', this.utility_convertTime ( in_json_data.start_time.toString() ), 0, 0 ) );
        rowElement.appendChild ( this.domBuilder_PopulateWeekdayBody_one_column ( 'town', this.utility_createAddressTown ( in_json_data ), 0, 0 ) );
        rowElement.appendChild ( this.domBuilder_PopulateWeekdayBody_one_column ( 'name', in_json_data.meeting_name.toString(), 0, 0 ) );
        var latitude = in_json_data.latitude;
        var longitude = in_json_data.longitude;
        rowElement.appendChild ( this.domBuilder_PopulateWeekdayBody_one_column ( 'address', this.utility_createStreetAddress ( in_json_data ), latitude, longitude ) );
        rowElement.appendChild ( this.domBuilder_PopulateWeekdayBody_one_column ( 'formats', in_json_data.formats.toString(), 0, 0 ) );
        
        return rowElement;
    };
    
    /************************************************************************************//**
    *	\brief Populates one row 
    ****************************************************************************************/
    this.domBuilder_PopulateWeekdayBody_one_column = function ( in_tag,
                                                                in_string,
                                                                in_latitude,
                                                                in_longitude
                                                                )
    {
        var columnElement = document.createElement ( 'td' );
        columnElement.className = 'bmlt_table_tbody_td bmlt_table_tbody_td_' + in_tag;

        if ( in_tag == 'formats' )
            {
            var formats_div = this.utility_createFormats ( in_string );
            if ( formats_div )
                {
                columnElement.appendChild ( formats_div );
                };
            }
        else if ( in_latitude && in_longitude )
            {
            var textNode = document.createElement ( 'span' );
            var anchorNode = document.createElement ( 'a' );
            anchorNode.href= this.sprintf ( g_table_map_link_uri_format, parseFloat ( in_latitude ), parseFloat ( in_longitude ) );
            anchorNode.appendChild ( document.createTextNode ( in_string ) );
            textNode.appendChild ( anchorNode );
            columnElement.appendChild ( textNode );
            }
        else
            {
            var textNode = document.createElement ( 'span' );
            textNode.className = 'bmlt_table_tbody_td_span_' + in_tag;
            textNode.appendChild ( document.createTextNode ( in_string ) );
            columnElement.appendChild ( textNode );
            };
            
        return columnElement;
    };

    /****************************************************************************************
    *#################################### THIRD-PARTY CODE #################################*
    ****************************************************************************************/
    /**
    sprintf() for JavaScript 0.6

    Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
        * Redistributions of source code must retain the above copyright
          notice, this list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright
          notice, this list of conditions and the following disclaimer in the
          documentation and/or other materials provided with the distribution.
        * Neither the name of sprintf() for JavaScript nor the
          names of its contributors may be used to endorse or promote products
          derived from this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


    Changelog:
    2007.04.03 - 0.1:
     - initial release
    2007.09.11 - 0.2:
     - feature: added argument swapping
    2007.09.17 - 0.3:
     - bug fix: no longer throws exception on empty paramenters (Hans Pufal)
    2007.10.21 - 0.4:
     - unit test and patch (David Baird)
    2010.05.09 - 0.5:
     - bug fix: 0 is now preceeded with a + sign
     - bug fix: the sign was not at the right position on padded results (Kamal Abdali)
     - switched from GPL to BSD license
    2010.05.22 - 0.6:
     - reverted to 0.4 and fixed the bug regarding the sign of the number 0
     Note:
     Thanks to Raphael Pigulla <raph (at] n3rd [dot) org> (http://www.n3rd.org/)
     who warned me about a bug in 0.5, I discovered that the last update was
     a regress. I appologize for that.
    **/

    this.str_repeat = function (i,
                                m
                                )
    {
        for (var o = []; m > 0; o[--m] = i);
        return o.join('');
    };

    this.sprintf = function ()
    {
        var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
        while (f)
            {
            if (m = /^[^\x25]+/.exec(f))
                {
                o.push(m[0]);
                }
            else if (m = /^\x25{2}/.exec(f))
                {
                o.push('%');
                }
            else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f))
                {
                if (((a = arguments[m[1] || i++]) == null) || (a == undefined))
                    {
                    throw('Too few arguments.');
                    };
                
                if (/[^s]/.test(m[7]) && (typeof(a) != 'number'))
                    {
                    throw('Expecting number but found ' + typeof(a));
                    };
                
                switch (m[7])
                    {
                    case 'b': a = a.toString(2); break;
                    case 'c': a = String.fromCharCode(a); break;
                    case 'd': a = parseInt(a,10); break;
                    case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
                    case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
                    case 'o': a = a.toString(8); break;
                    case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
                    case 'u': a = Math.abs(a); break;
                    case 'x': a = a.toString(16); break;
                    case 'X': a = a.toString(16).toUpperCase(); break;
                    };
                
                a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+' + a : a);
                c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
                x = m[5] - String(a).length - s.length;
                p = m[5] ? this.str_repeat(c, x) : '';
                o.push(s + (m[4] ? a + p : p + a));
                }
            else
                {
                throw('Huh ?!');
                };
            
            f = f.substring(m[0].length);
            };
        return o.join('');
    };
    
    /****************************************************************************************
    *################################### MAIN FUNCTION CODE ################################*
    ****************************************************************************************/
    
    this.my_container_object = document.getElementById ( in_display_id );
    this.my_container_object.handlerObject = this;
    
    this.my_settings_id = in_settings_id;
    this.my_ajax_base_uri = in_ajax_base_uri;
    this.my_start_weekday = in_start_weekday;
    this.my_search_query_params = in_search_params;
    this.my_military_time = in_is_military_time;
	
	this.my_sort_key_time = 'start_time,location_nation,location_province,location_sub_province,location_city_subsection,location_municipality,location_neighborhood,meeting_name';
	this.my_sort_key_meeting_name = 'meeting_name,start_time,location_city_subsection,location_municipality';
	this.my_sort_key_town = 'location_city_subsection,location_municipality,start_time,meeting_name';
	this.my_sort_key_address = 'location_text,location_street,location_city_subsection,location_municipality,start_time,meeting_name';

    this.my_selected_sort_key = this.my_sort_key_time;
    this.my_sort_dir = 'asc';
    
    this.my_container_object.style.display = 'block';
    this.domBuilder_CreateHeader();
};
