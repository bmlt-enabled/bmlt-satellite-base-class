/****************************************************************************************//**
* \file quicksearch.js                                                                      *
* \brief The javascript for the [[bmlt_quicksearch]] shortcode of the BMLTPlugin class.     *
*   \version 3.6.0                                                                          *
    
    This file is part of the BMLT Common Satellite Base Class Project. The project GitHub
    page is available here: https://github.com/MAGSHARE/BMLT-Common-CMS-Plugin-Class
    
    This file is part of the Basic Meeting List Toolbox (BMLT).
    
    Find out more at: http://bmlt.magshare.org
    
    BMLT is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    BMLT is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this code.  If not, see <http://www.gnu.org/licenses/>.
********************************************************************************************/
function BMLTQuickSearch ( inID, inAjaxURI, inOptionsID, inTownFilter )
{
    this.m_differentiatorID = inID.toString();
    this.m_ajaxURI = inAjaxURI.toString();
    this.m_optionsID = inOptionsID.toString();
    this.m_main_container = document.getElementById ( 'quicksearch_div_' + inID );
    this.m_main_form_container = document.getElementById ( 'quicksearch_form_container_' + inID );
    this.m_town_select = document.getElementById ( 'quicksearch_form_town_select_' + inID );
    this.m_town_select.handler = this;
    this.m_town_select.onchange = BMLTQuickSearch.prototype.reactToTownPopup;
    this.m_weekdays_container = document.getElementById ( 'quicksearch_form_weekdays_container_' + inID );
    this.m_select_container = document.getElementById ( 'quicksearch_form_select_container_' + inID );
    this.m_throbber_container = document.getElementById ( 'quicksearch_throbber_div_' + inID );
    this.m_search_text_field = document.getElementById ( 'quicksearch_form_search_text_' + inID );
    this.m_submit_button = document.getElementById ( 'quicksearch_form_submit_button_' + inID );
    this.m_submit_button.handler = this;
    this.m_submit_button.onclick = BMLTQuickSearch.prototype.reactToSearchButton;
    this.m_no_results_div = document.getElementById ( 'quicksearch_no_results_div_' + inID );
    this.m_search_results_div = document.getElementById ( 'quicksearch_search_results_div_' + inID );
    this.m_search_results_container_div = document.getElementById ( 'quicksearch_results_container_' + inID );
    this.m_town_filter = inTownFilter;
    var id = this.m_differentiatorID;
    this.m_main_container.onkeypress = function () { BMLTQuickSearch.prototype.reactToKeyDown ( id ); };
    this.m_search_text_field.onfocus = function () { BMLTQuickSearch.prototype.reactToKeyDown ( id ); };
    this.m_search_text_field.onblur = function () { BMLTQuickSearch.prototype.reactToKeyDown ( id ); };
    this.m_weekday_objects = new Array();
    
    for ( var index = 0; index < 8; index++ )
        {
        var weekdayCheckboxObject = document.getElementById ( 'quicksearch_form_weekday_checkbox_' + index.toString() );
        weekdayCheckboxObject.handler = this;
        weekdayCheckboxObject.onchange = BMLTQuickSearch.prototype.reactToWeekdayCheckboxChange;
        this.m_weekday_objects.push ( weekdayCheckboxObject );
        };

    this.m_main_container.style.display="block";
    var baseURI = this.m_ajaxURI + "?bmlt_settings_id=" + this.m_optionsID + "&redirect_ajax_json=";
    var townURI =  baseURI + encodeURI ( 'switcher=GetFieldValues&meeting_key=location_municipality' );
    var boroughURI =  baseURI + encodeURI ( 'switcher=GetFieldValues&meeting_key=location_city_subsection' );
    var weekdayURI = baseURI + encodeURI ( 'switcher=GetFieldValues&meeting_key=weekday_tinyint' );
    var ajax_request1 = BMLTPlugin_AjaxRequest ( townURI, BMLTQuickSearch.prototype.ajaxCallbackTowns, 'get', this.m_differentiatorID );
    var ajax_request2 = BMLTPlugin_AjaxRequest ( boroughURI, BMLTQuickSearch.prototype.ajaxCallbackBoroughs, 'get', this.m_differentiatorID );
    var ajax_request3 = BMLTPlugin_AjaxRequest ( weekdayURI, BMLTQuickSearch.prototype.ajaxCallbackWeekdays, 'get', this.m_differentiatorID );
};

/****************************************************************************************//**
********************************************************************************************/

BMLTQuickSearch.prototype.m_differentiatorID = "";
BMLTQuickSearch.prototype.m_ajaxURI = "";
BMLTQuickSearch.prototype.m_optionsID = "";
BMLTQuickSearch.prototype.m_last_search_results_meetings = null;
BMLTQuickSearch.prototype.m_last_search_results_formats = null;
BMLTQuickSearch.prototype.m_main_container = null;
BMLTQuickSearch.prototype.m_town_select = null;
BMLTQuickSearch.prototype.m_towns_temp = null;
BMLTQuickSearch.prototype.m_towns = null;
BMLTQuickSearch.prototype.m_boroughs = null;
BMLTQuickSearch.prototype.m_weekdays = null;
BMLTQuickSearch.prototype.m_weekday_objects = null;
BMLTQuickSearch.prototype.m_main_form_container = null;
BMLTQuickSearch.prototype.m_throbber_container = null;
BMLTQuickSearch.prototype.m_search_text_field = null;
BMLTQuickSearch.prototype.m_submit_button = null;
BMLTQuickSearch.prototype.m_search_results_container_div = null;
BMLTQuickSearch.prototype.m_search_results_div = null;
BMLTQuickSearch.prototype.m_no_results_div = null;
BMLTQuickSearch.prototype.m_town_filter = null;
BMLTQuickSearch.prototype.m_select_container = null;
	
/****************************************************************************************//**
*                                     INTERNAL METHODS                                      *
********************************************************************************************/
BMLTQuickSearch.prototype.showThrobber = function (  )
{
    this.m_throbber_container.style.display = 'block';
    this.m_main_form_container.style.display = 'none';
};
	
/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.hideThrobber = function (  )
{
    this.m_throbber_container.style.display = 'none';
    this.m_main_form_container.style.display = 'block';
};
	
/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.showResults = function (  )
{
    this.m_search_results_container_div.style.display = 'block';
    
    if ( this.m_last_search_results_meetings && this.m_last_search_results_meetings.length )
        {
        this.populateResults();
        }
    else
        {
        this.m_no_results_div.style.display = 'block';
        this.m_search_results_div.style.display = 'none';
        this.m_search_results_div.innerHTML = '';
        };
};
	
/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.populateResults = function (  )
{
    this.m_search_results_div.innerHTML = '';
        
    if ( this.m_last_search_results_meetings.length )
        {
        this.m_no_results_div.style.display = 'none';
        
        for ( var index = 0; index < this.m_last_search_results_meetings.length; index++ )
            {
            var meeting = this.m_last_search_results_meetings[index];
            
            this.addMeeting ( this.m_last_search_results_meetings[index], this.m_search_results_div, index );
            };
        
        this.m_search_results_div.style.display = 'block';
        }
    else
        {
        this.m_no_results_div.style.display = 'block';
        this.m_search_results_div.style.display = 'none';
        this.m_search_results_div.innerHTML = '';
        };
};

/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.addMeeting = function ( inMeetingObject, inContainerObject, inCount )
{
    var meetingDiv = document.createElement ( 'div' );
    meetingDiv.className = 'bmlt_quicksearch_sinlge_meeting_container' + ' bmlt_quicksearch_sinlge_meeting_container_' + this.m_differentiatorID.toString();
    meetingDiv.id = 'bmlt_quicksearch_sinlge_meeting_container_' + this.m_differentiatorID.toString() + '_' + inMeetingObject.id_bigint.toString();

    meetingDiv.appendChild ( this.domBuilder_PopulateWeekdayBody_one_meeting ( inMeetingObject ) );
    
    inContainerObject.appendChild ( meetingDiv );
};

/************************************************************************************//**
    \brief  Populates one row (meeting)
    \param in_json_data The JSON data for the meeting.
    \returns the instantiated DOM object.
****************************************************************************************/
BMLTQuickSearch.prototype.domBuilder_PopulateWeekdayBody_one_meeting = function ( in_json_data )
{
    var rowElement = document.createElement ( 'ul' );
    rowElement.className = 'bmlt_quicksearch_data_ul';
    var comments = null;
    
    if ( in_json_data.comments )
        {
        comments = in_json_data.comments;
        };
    
    var latitude = in_json_data.latitude;
    var longitude = in_json_data.longitude;

    var time_column = this.domBuilder_PopulateWeekdayBody_one_column ( 'time', this.utility_convertTime ( in_json_data.start_time.toString() ), 0, 0 );
    var town_column = this.domBuilder_PopulateWeekdayBody_one_column ( 'town', this.utility_createAddressTown ( in_json_data ), 0, 0 );
    var name_column = this.domBuilder_PopulateWeekdayBody_one_column ( 'name', in_json_data.meeting_name.toString(), 0, 0 );
    var address_column = this.domBuilder_PopulateWeekdayBody_one_column ( 'address', this.utility_createStreetAddress ( in_json_data ), latitude, longitude );
    var format_column = this.domBuilder_PopulateWeekdayBody_one_column ( 'formats', in_json_data.formats.toString(), 0, 0 );
    
    rowElement.appendChild ( time_column );
    rowElement.appendChild ( town_column );
    rowElement.appendChild ( name_column );
    rowElement.appendChild ( address_column );
    rowElement.appendChild ( format_column );
    
    if ( in_json_data.comments )
        {
        var comments_column = this.domBuilder_PopulateWeekdayBody_one_column ( 'comments', in_json_data.comments.toString(), 0, 0 );
        rowElement.appendChild ( comments_column );
        };
    
    var div = document.createElement ( 'div' );
    div.className = 'bmlt_breaker_div';
    rowElement.appendChild ( div );
    
    return rowElement;
};

/************************************************************************************//**
    \brief Populates one column of a meeting row.
    \param in_tag The tag used as a key for this column
    \param in_string The name of the column (displayed as a string)
    \param in_latitude if supplied, the longitude of a meeting (is usually null)
    \param in_longitude if supplied, the latitude of a meeting (is usually null)
    \returns the instantiated DOM object.
****************************************************************************************/
BMLTQuickSearch.prototype.domBuilder_PopulateWeekdayBody_one_column = function ( in_tag, in_string, in_latitude, in_longitude )
{
    var columnElement = document.createElement ( 'li' );
    columnElement.className = 'bmlt_quicksearch_data_ul_li bmlt_quicksearch_data_ul_li_' + in_tag;

    if ( in_tag == 'formats' )
        {
        var formats_div = this.domBuilder_createFormats ( in_string );
        if ( formats_div )
            {
            columnElement.appendChild ( formats_div );
            };
        }
    else if ( in_latitude && in_longitude )
        {
        var textNode = document.createElement ( 'span' );
        textNode.className = 'bmlt_quicksearch_data_ul_li_span bmlt_quicksearch_data_ul_li_span_' + in_tag;
        var anchorNode = document.createElement ( 'a' );
        textNode.className = 'bmlt_quicksearch_data_ul_li_span_a bmlt_quicksearch_data_ul_li_span_a_' + in_tag;
        anchorNode.href= this.utility_sprintf ( g_table_map_link_uri_format, parseFloat ( in_latitude ), parseFloat ( in_longitude ) );
        anchorNode.innerHTML = in_string;
        textNode.appendChild ( anchorNode );
        columnElement.appendChild ( textNode );
        }
    else
        {
        var textNode = document.createElement ( 'span' );
        textNode.className = 'bmlt_quicksearch_data_ul_li_span bmlt_quicksearch_data_ul_li_span_' + in_tag;
        textNode.innerHTML = in_string ? in_string : '&nbsp;';
        columnElement.appendChild ( textNode );
        };
        
    return columnElement;
};

/************************************************************************************//**
    \brief  This turns military time to ante meridian format or cleaned military time.
            If the time is midnight or noon, the localized string for that is returned.
    \param in_time_string A string with the time in military format.
    \returns A string, with the properly formatted time ("Noon", "Midnight", "HH:MM" or "HH:MM AM|PM").
****************************************************************************************/
BMLTQuickSearch.prototype.utility_convertTime = function ( in_time_string )
{
    var ret = in_time_string;
    var time_array = in_time_string.split ( ":" );
    var hours = parseInt ( time_array[0] );
    var minutes = parseInt ( time_array[1] );
    
    // We use "Noon" and "Midnight" strings for those times.
    // Kludge, to make "Midnight" late, as the computer wants it to be early.
    // Anything over 23:54:59 is "Midnight."
    if ( ((0 == hours) && (0 == minutes)) || ((hours == 23) && (minutes >= 55)) )
        {
        ret = g_table_ampm_array[3];    // Midnight
        }
    else if ( (12 == hours) && (0 == minutes) )
        {
        ret = g_table_ampm_array[2];    // Noon
        }
    else if ( !this.my_military_time )
        {
        var ampm = ( hours >= 12 ) ? g_table_ampm_array[1] : g_table_ampm_array[0];
        
        // Subtract 12 from afternoon.
        if ( hours > 12 )
            {
            hours -= 12;
            };
        
        // Padding with a leading 0.
        if ( minutes < 10 )
            {
            minutes = "0" + minutes.toString();
            };
        
        ret = hours.toString() + ':' + minutes + ' ' + ampm;
        }
    else
        {
        // Padding with a leading 0.
        if ( minutes < 10 )
            {
            minutes = "0" + minutes.toString();
            };
        
        
        ret = hours.toString() + ':' + minutes.toString();
        };
    
    return ret;
};

/************************************************************************************//**
    \brief  This builds a readable aggregated street address from the components in the JSON.
            Very simply, we just do the location name and street address.
    \param in_json_data The JSON data for one meeting.
    \returns a string, with the address HTML.
****************************************************************************************/
BMLTQuickSearch.prototype.utility_createStreetAddress = function ( in_json_data )
{
    var ret = '';

    if ( in_json_data.location_text && in_json_data.location_text.toString() )
        {
        ret = '<span class="bmlt_quicksearch_location_text_span">';  // This allows folks to style the location name.
        ret += in_json_data.location_text.toString();
        if ( (ret != '') && in_json_data.location_street && in_json_data.location_street.toString() )
            {
            ret += '<span class="bmlt_quicksearch_location_text_comma_span">, </span>';
            };
        ret += '</span>';
        };
    
    if ( in_json_data.location_street && in_json_data.location_street.toString() )
        {
        ret += '<span class="bmlt_quicksearch_location_street_span">';  // This allows folks to style the street.
        ret += in_json_data.location_street.toString();
        ret += '</span>';
        };
        
    return ret;
};

/************************************************************************************//**
    \brief  This builds an aggregated town from the components in the JSON.
    \param in_json_data The JSON data for one meeting.
    \returns a string, with the town HTML.
****************************************************************************************/
BMLTQuickSearch.prototype.utility_createAddressTown = function ( in_json_data )
{
    var hasTown = false;
    var ret = '<span class="bmlt_quicksearch_town_span">';  // This allows folks to style the town.
    
    // We prefer boroughs, as folks think of them as "towns."
    if ( in_json_data.location_city_subsection && in_json_data.location_city_subsection.toString() )
        {
        ret += in_json_data.location_city_subsection.toString();
        hasTown = true;
        }
    else
        {
        if ( in_json_data.location_municipality && in_json_data.location_municipality.toString() )
            {
            ret += in_json_data.location_municipality.toString();
            hasTown = true;
            };
        };
    
    if ( hasTown && in_json_data.location_province && in_json_data.location_province.toString() )
        {
        ret += '<span class="bmlt_quicksearch_town_comma_span">, </span>';
        };
    
    ret += '</span>';
    
    // Add the state.
    if ( in_json_data.location_province && in_json_data.location_province.toString() )
        {
        ret += '<span class="bmlt_quicksearch_state_span">';  // This allows folks to style the state.            
        ret += in_json_data.location_province.toString();
        ret += '</span>';
        };
    
    // Add the zip.
    if ( in_json_data.location_postal_code_1 && in_json_data.location_postal_code_1.toString() )
        {
        ret += '<span class="bmlt_quicksearch_zip_span">';  // This allows folks to style the zip.            
    
        if ( hasTown && in_json_data.location_province && in_json_data.location_province.toString() )
            {
            ret += '<span class="bmlt_quicksearch_zip_space_span"> </span>';
            };
        
        ret += in_json_data.location_postal_code_1.toString();
        ret += '</span>';
        };
    
    return ret;
};

/************************************************************************************//**
    \brief  This builds a div element for the given formats. The div is filled with spans; one for each format.
    \param in_formats_string The JSON data for one meeting.
    \returns the instantiated DOM object.
****************************************************************************************/
BMLTQuickSearch.prototype.domBuilder_createFormats = function ( in_formats_string )
{
    var ret = document.createElement ( 'div' );
    ret.className = 'bmlt_quicksearch_formats_div';
    var formatsArray = in_formats_string.split ( ',' );
    
    for ( var i = 0; i < formatsArray.length; i++ )
        {
        var format_string = formatsArray[i].toString();
        var span = this.domBuilder_createOneFormatSpan ( format_string );
        if ( span )
            {
            ret.appendChild ( span );
            };
        };
    
    if ( ret.childNodes.length == 0 )
        {
        ret = null;
        }
    else
        {
        var div = document.createElement ( 'div' );
        div.style = 'clear:both';
        ret.appendChild ( div );
        };
    
    return ret;
};

/************************************************************************************//**
    \brief  This builds a span element for the given format.
    \param in_format_string format key.
    \returns the instantiated DOM object.
****************************************************************************************/
BMLTQuickSearch.prototype.domBuilder_createOneFormatSpan = function ( in_format_string )
{
    if ( in_format_string )
        {
        var ret = document.createElement ( 'span' );
        ret.rest_className = 'bmlt_quicksearch_format_span bmlt_quicksearch_format_span_' + in_format_string;
        ret.className = ret.rest_className;
        ret.appendChild ( document.createTextNode ( in_format_string ) );
        for ( var i = 0; i < this.m_last_search_results_formats.length; i++ )
            {
            var format_object = this.m_last_search_results_formats[i];
            
            if ( format_object.key_string == in_format_string )
                {
                var title_string = format_object.name_string;
                ret.setAttribute ( 'title', title_string );
                };
            };
        return ret;
        };
    
    return null;
};

/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.hideResults = function (  )
{
    this.m_search_results_container_div.style.display = 'none';
};
	
/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.searchList = function ( inIDList )
{
    this.m_last_search_results_meetings = null;
    this.m_last_search_results_formats = null;
    
    var uri = this.m_ajaxURI + "?bmlt_settings_id=" + this.m_optionsID + "&redirect_ajax_json=" + encodeURI ( 'switcher=GetSearchResults&get_used_formats=1' );
    
    if ( inIDList )
        {
        uri += encodeURI ( '&SearchString=' + inIDList.join(',') );
        }
    else
        {
        if ( !this.m_weekday_objects[0].checked )
            {
            var temp = [];
            for ( var weekday = 1; weekday < 8; weekday++ )
                {
                var weekdayCheckbox = this.m_weekday_objects[weekday];
                if ( weekdayCheckbox.checked )
                    {
                    temp.push ( 'weekdays[]=' + weekday.toString() );
                    };
                };
            
            if ( temp.length )
                {
                uri += '&' + temp.join ( '&' );
                }
            else
                {
                uri = null;
                };
            };
        };
    
    if ( uri )
        {
        var ajax_request = BMLTPlugin_AjaxRequest ( uri, BMLTQuickSearch.prototype.ajaxCallbackSearch, 'get', this.m_differentiatorID );
        }
    else
        {
        this.hideThrobber();
        this.m_no_results_div.style.display = 'block';
        this.m_search_results_div.style.display = 'none';
        this.m_search_results_div.innerHTML = '';
        this.showResults();
        };
};

/****************************************************************************************//**
*   From here: https://stackoverflow.com/a/11076088/879365                                  *
********************************************************************************************/
BMLTQuickSearch.prototype.intersectingArrays = function (/* pass all arrays here */) {
    var output = [];
    var cntObj = {};
    var array, item, cnt;
    
    // for each array passed as an argument to the function
    for (var i = 0; i < arguments.length; i++)
        {
        array = arguments[i];
        // for each element in the array
        for ( var j = 0; j < array.length; j++ )
            {
            item = "-" + array[j];
            cnt = cntObj[item] || 0;
            // if cnt is exactly the number of previous arrays, 
            // then increment by one so we count only one per array
            if (cnt == i)
                {
                cntObj[item] = cnt + 1;
                };
            };
        };
        
    // now collect all results that are in all arrays
    for ( item in cntObj )
        {
        if (cntObj.hasOwnProperty(item) && cntObj[item] === arguments.length)
            {
            output.push(item.substring(1));
            };
        };
    
    return(output);
};

/****************************************************************************************//**
*                                        HANDLERS                                           *
********************************************************************************************/
BMLTQuickSearch.prototype.startASearch = function (  )
{
    this.hideResults();
    this.showThrobber();
    this.m_last_search_results_meetings = null;
    this.m_last_search_results_formats = null;
    
    var town = null;
    
    // 1 town, the select is hidden.
    if ( 1 == this.m_towns.length )
        {
        town = this.m_towns[0].location_municipality;
        }
    else
        {
        town = this.m_town_select.value;
        };

    var townIDs = [];

    for ( var townIndex = 0; townIndex < this.m_towns.length; townIndex++ )
        {
        var townObject = this.m_towns[townIndex];

        var idArray = townObject.ids.split(",");
        
        if ( townObject.location_municipality == town )
            {
            townIDs = idArray;
            break;
            }
        else
            {
            if ( !town )
                {
                townIDs.push.apply ( townIDs, idArray );
                };
            };
        };
    
    if ( townIDs.length )
        {
        var resultArray = [];
    
        for ( var weekday = 1; weekday < 8; weekday++ )
            {
            var weekdayCheckbox = this.m_weekday_objects[weekday];
            if ( weekdayCheckbox.checked )
                {
                var wValue = weekdayCheckbox.value;
                for ( var index = 0; index < 7; index++ )
                    {
                    if ( this.m_weekdays[index].weekday_tinyint == wValue )
                        {
                        var idArray = this.m_weekdays[index].ids.split(",");
                    
                        if ( idArray && idArray.length )
                            {
                            if ( !resultArray || !resultArray.length )
                                {
                                resultArray = idArray;
                                }
                            else
                                {
                                resultArray.push.apply ( resultArray, idArray );
                                };
                            };
                        break;
                        };
                    };
                };
            };
        
        resultArray = this.intersectingArrays ( resultArray, townIDs );
    
        if ( resultArray && resultArray.length )
            {
            this.searchList ( resultArray );
            }
        else
            {
            this.displaySearchResults ( null );
            };
        }
    else
        {
        this.displaySearchResults ( null );
        };
};

/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.displaySearchResults = function ( inSearchResults )
{
    if ( inSearchResults && inSearchResults.meetings && inSearchResults.meetings.length )
        {
        var meetings = [];
        if ( this.m_search_text_field && this.m_search_text_field.value )
            {
            for ( var index = 0; index < inSearchResults.meetings.length; index++ )
                {
                var meeting_object = inSearchResults.meetings[index];
                
                if ( this.meetingContainsString ( meeting_object, this.m_search_text_field.value ) )
                    {
                    meetings.push ( meeting_object );
                    };
                };
            }
        else
            {
            meetings = inSearchResults.meetings;
            };
        
        this.m_last_search_results_meetings = meetings;
        this.m_last_search_results_formats = inSearchResults.formats;
        };

    this.hideThrobber();
    this.showResults();
};

/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.meetingContainsString = function ( inMeetingObject, inSearchString )
{
    var searchString = inSearchString.trim().toLowerCase();
    var meetingName = inMeetingObject.meeting_name ? inMeetingObject.meeting_name.trim().toLowerCase() : '';
    var venueName = inMeetingObject.location_text ? inMeetingObject.location_text.trim().toLowerCase() : '';
    var streetAddress = inMeetingObject.location_street ? inMeetingObject.location_street.trim().toLowerCase() : '';
    var town = inMeetingObject.location_municipality ? inMeetingObject.location_municipality.trim().toLowerCase() : '';
    var borough = inMeetingObject.location_city_subsection ? inMeetingObject.location_city_subsection.trim().toLowerCase() : '';
    var neighborhood = inMeetingObject.location_neighborhood ? inMeetingObject.location_neighborhood.trim().toLowerCase() : '';
    var county = inMeetingObject.location_sub_province ? inMeetingObject.location_sub_province.trim().toLowerCase() : '';
    var state = inMeetingObject.location_province ? inMeetingObject.location_province.trim().toLowerCase() : '';
    var zip = inMeetingObject.location_postal_code_1 ? inMeetingObject.location_postal_code_1.trim().toLowerCase() : '';
    var comments = inMeetingObject.comments ? inMeetingObject.comments.trim().toLowerCase() : '';

    if ( -1 != meetingName.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != venueName.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != comments.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != streetAddress.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != town.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != borough.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != neighborhood.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != county.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != state.search ( searchString ) )
        {
        return true;
        };

    if ( -1 != zip.search ( searchString ) )
        {
        return true;
        };
    
    return false;
};

/****************************************************************************************//**
*                                        REACTORS                                           *
********************************************************************************************/
BMLTQuickSearch.prototype.reactToWeekdayCheckboxChange = function ( inEvent )
{
    var checkbox = inEvent.currentTarget;
    var context = checkbox.handler;
    
    context.m_last_search_results_meetings = null;
    context.m_last_search_results_formats = null;
    context.hideResults();

    var allchecked = true;
    var allunchecked = true;
    
    for ( var index = 1; index < 8; index++ )
        {
        if ( !context.m_weekday_objects[index].checked )
            {
            allchecked = false;
            }
        else
            {
            allunchecked = false;
            };
        };
    
    if ( checkbox.value == 0 )
        {
        for ( var index = 1; index < 8; index++ )
            {
            context.m_weekday_objects[index].checked = checkbox.checked;
            };
        }
    else
        {
        context.m_weekday_objects[0].checked = allchecked;
        };
};

/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.reactToTownPopup = function ( inEvent )
{
    var select = inEvent.currentTarget;
    var context = select.handler;
    
    context.m_last_search_results_meetings = null;
    context.m_last_search_results_formats = null;
    context.hideResults();
};

/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.reactToSearchButton = function ( inEvent )
{
    var button = inEvent.currentTarget;
    var context = button.handler;
    
    context.startASearch();
};
  
/****************************************************************************************//**
*	\brief This just traps the enter key for the text entry.                                *
********************************************************************************************/
BMLTQuickSearch.prototype.reactToKeyDown = function ( in_id )
    {
    eval ( 'var context = bmlt_quicksearch_form_' + in_id + ';' );
    if ( event.keyCode == 13 )
        {
        context.startASearch();
        }
    else
        {
        context.hideResults();
        };
    };

/****************************************************************************************//**
*                                    FORM BUILDERS                                          *
********************************************************************************************/
BMLTQuickSearch.prototype.populateTownsSelect = function ( inTownsAJAXObject, inBoroughsAJAXObject )
{
    var towns = inTownsAJAXObject;
    this.m_towns_temp = null;
    
    if ( inBoroughsAJAXObject && inBoroughsAJAXObject.length )
        {
        for ( var index = 0; index < inBoroughsAJAXObject.length; index++ )
            {
            newTown = new Object();
            newTown.location_municipality = inBoroughsAJAXObject[index].location_city_subsection;
            newTown.ids = inBoroughsAJAXObject[index].ids;
            towns.push ( newTown );
            };
        };
    
    this.m_towns = [];
    
    var towns = towns.sort(function ( a, b ) { return (a.location_municipality.toString() < b.location_municipality.toString()) ? -1 : ((a.location_municipality.toString() > b.location_municipality.toString()) ? 1 : 0)});
    
    this.m_town_select.options.length = 1;
    
    var count = 0;
    
    for ( var index = 0; index < towns.length; index++ )
        {
        var townObject = towns[index];

        if ( this.m_town_filter && this.m_town_filter.length )
            {
            var townName = townObject.location_municipality.toString().toLowerCase();
        
            if ( -1 == this.m_town_filter.indexOf ( townName ) )
                {
                continue;
                };
            };
    
        count++;
        this.m_towns.push ( townObject );
        var option = document.createElement ( 'option' );
        option.value = townObject.location_municipality.toString();
        option.appendChild ( document.createTextNode(option.value) );
        this.m_town_select.appendChild ( option );
        };
    
    if ( 1 == count )
        {
        this.m_select_container.style.display = 'none';
        }
    else
        {
        this.m_select_container.style.display = 'table';
        };
    
    if ( this.m_weekdays )
        {
        this.hideThrobber();
        this.hideResults();
        };
};

/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.populateWeekdays = function ( inWeekdaysAJAXObject )
{
    this.m_weekdays = inWeekdaysAJAXObject.sort(function ( a, b ) { return (a.weekday_tinyint - b.weekday_tinyint)});
    
    if ( this.m_towns )
        {
        this.hideThrobber();
        this.hideResults();
        };
};

/****************************************************************************************//**
*                                   AJAX CALLBACKS                                          *
********************************************************************************************/
BMLTQuickSearch.prototype.ajaxCallbackTowns = function (    in_response_object, ///< The HTTPRequest response object.
                                                            in_id               ///< The unique ID of the object (establishes context).
                                                            )
{
    eval ( 'var context = bmlt_quicksearch_form_' + in_id + ';' );

    if ( context )
        {
        if ( in_response_object.responseText )
            {
            var new_object = null;
            var json_builder = "var new_object = " + in_response_object.responseText + ";";
    
            // This is how you create JSON objects.
            eval ( json_builder );
            if ( this.m_boroughs )
                {
                context.populateTownsSelect ( new_object, this.m_boroughs );
                }
            else
                {
                this.m_towns_temp = new_object;
                };
            };
        };
};

/****************************************************************************************//**
*                                   AJAX CALLBACKS                                          *
********************************************************************************************/
BMLTQuickSearch.prototype.ajaxCallbackBoroughs = function ( in_response_object, ///< The HTTPRequest response object.
                                                            in_id               ///< The unique ID of the object (establishes context).
                                                            )
{
    eval ( 'var context = bmlt_quicksearch_form_' + in_id + ';' );

    if ( context )
        {
        if ( in_response_object.responseText )
            {
            var new_object = null;
            var json_builder = "var new_object = " + in_response_object.responseText + ";";
    
            // This is how you create JSON objects.
            eval ( json_builder );
            if ( this.m_towns_temp )
                {
                context.populateTownsSelect ( this.m_towns_temp, new_object );
                }
            else
                {
                this.m_boroughs = new_object;
                };
            };
        };
};
	
/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.ajaxCallbackWeekdays = function ( in_response_object, ///< The HTTPRequest response object.
                                                            in_id               ///< The unique ID of the object (establishes context).
                                                            )
{
    eval ( 'var context = bmlt_quicksearch_form_' + in_id + ';' );

    if ( context )
        {
        if ( in_response_object.responseText )
            {
            var new_object = null;
            var json_builder = "var new_object = " + in_response_object.responseText + ";";
    
            // This is how you create JSON objects.
            eval ( json_builder );
            context.populateWeekdays ( new_object );
            };
        };
};
	
/****************************************************************************************//**
********************************************************************************************/
BMLTQuickSearch.prototype.ajaxCallbackSearch = function (   in_response_object, ///< The HTTPRequest response object.
                                                            in_id               ///< The unique ID of the object (establishes context).
                                                            )
{
    eval ( 'var context = bmlt_quicksearch_form_' + in_id + ';' );

    if ( context )
        {
        if ( in_response_object.responseText && ("<" != in_response_object.responseText[0]) )
            {
            var new_object = null;
            var json_builder = "var new_object = " + in_response_object.responseText + ";";
    
            // This is how you create JSON objects.
            eval ( json_builder );
            
            context.displaySearchResults ( new_object );
            }
        else
            {
            context.displaySearchResults ( null );
            };
        };
};

/****************************************************************************************
*#################################### THIRD-PARTY CODE #################################*
****************************************************************************************/
/**
    \param in_pattern   The printf pattern to use
    \param ... any variables needed to satisfy the pattern.
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
*/
BMLTQuickSearch.prototype.utility_sprintf = function ()
{
    function str_repeat (   i,
                            m
                        )
    {
        for (var o = []; m > 0; o[--m] = i);
        return o.join('');
    };
    
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
            p = m[5] ? str_repeat(c, x) : '';
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
