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
                                in_search_params    ///< The query parameters for the base search.
                            )
{
	/****************************************************************************************
	*									INSTANCE DATA MEMBERS								*
	****************************************************************************************/
	var my_container_object;
	var my_settings_id;
	var my_ajax_base_uri;
	var my_search_query_params;
	
    /****************************************************************************************
    *								  INTERNAL CLASS FUNCTIONS							    *
    ****************************************************************************************/
    
    /****************************************************************************************
    *################################# INITIAL SETUP ROUTINES ##############################*
    ****************************************************************************************/
    /************************************************************************************//**
    *	\brief 
    ****************************************************************************************/
    
    /****************************************************************************************
    *################################### MAIN FUNCTION CODE ################################*
    ****************************************************************************************/
    
    this.my_container_object = document.getElementById ( in_display_id );
    this.my_settings_id = in_settings_id;
    this.my_ajax_base_uri = in_ajax_base_uri;
    this.my_search_query_params = in_search_params;
    
alert ( this.my_container_object.id.toString() + "\n" + this.my_settings_id.toString() + "\n" + this.my_ajax_base_uri.toString() + "\n" + this.my_search_query_params.toString() );
};