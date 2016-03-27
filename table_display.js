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
        this.my_header_container.class = 'bmlt_table_header_weekday_list';
        var startingIndex = this.my_start_weekday;
        
        for ( var i = 0; i < 7; i++ )
            {
            this.my_weekday_links[i] = this.domBuilder_CreateOneWeekday ( startingIndex++ );
            if ( startingIndex == 7 )
                {
                startingIndex = 0;
                };
        
            this.my_header_container.appendChild ( this.my_weekday_links[i] );
            };
        
        this.my_container_object.appendChild ( this.my_header_container );
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
        weekdayElement.class = 'bmlt_table_header_weekday_list_element';
        weekdayElement.onclick = function () {this.handler.responder_weekdaySelected(this)};
        weekdayElement.appendChild ( document.createTextNode ( g_table_weekday_long_array[in_weekday_index] ) );
        var throbberImage = document.createElement ( 'img' );   // This will be the throbber.
        throbberImage.src = g_table_throbber_img_src;
        throbberImage.class = 'bmlt_table_throbber_image';
        weekdayElement.appendChild ( throbberImage );
        
        return weekdayElement;
    };
    
    /****************************************************************************************
    *##################################### UI RESPONDERS ###################################*
    ****************************************************************************************/
    /************************************************************************************//**
    *	\brief 
    ****************************************************************************************/
    this.responder_weekdaySelected = function ( in_weekday_object
                                                )
    {
alert ( in_weekday_object.index.toString() );
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

    this.domBuilder_CreateHeader();
};