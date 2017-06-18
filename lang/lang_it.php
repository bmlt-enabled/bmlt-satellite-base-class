<?php
// Italiano
/****************************************************************************************//**
*   \file   lang_it.php                                                                     *
*                                                                                           *
*   \brief  This file contains Italian localizations.                                       *
*   \version 3.4.7                                                                          *
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

class BMLT_Localized_BaseClass
    {
    /************************************************************************************//**
    *                           STATIC DATA MEMBERS (LOCALIZABLE)                           *
    ****************************************************************************************/
    
    /// These are all for the admin pages.
    static  $local_options_title = 'Basic Meeting List Toolbox Options';    ///< This is the title that is displayed over the options.
    static  $local_menu_string = 'Opzioni BMLT';                            ///< 'BMLT Options' - The name of the menu item.
    static  $local_options_prefix = 'Seleziona impostazioni ';              ///< 'Select Setting ' - The string displayed before each number in the options popup.
    static  $local_options_add_new = 'Aggiungi una nuova impostazione';     ///< 'Add A new Setting' - The string displayed in the "Add New Option" button.
    static  $local_options_save = 'Salva le modifiche';                     ///< 'Save Changes' - The string displayed in the "Save Changes" button.
    static  $local_options_delete_option = 'Elimina questa impostazione';   ///< 'Delete This Setting' - The string displayed in the "Delete Option" button.
    static  $local_options_delete_failure = 'Eliminazione impostazione non riuscita.'; ///< 'The setting deletion failed.' - The string displayed upon unsuccessful deletion of an option page.
    static  $local_options_create_failure = 'Creazione impostazione non riuscita.'; ///< 'The setting creation failed.' - The string displayed upon unsuccessful creation of an option page.
    static  $local_options_delete_option_confirm = 'Sei sicuro di voler eliminare questa impostazione?';    ///< 'Are you sure that you want to delete this setting?' - The string displayed in the "Are you sure?" confirm.
    static  $local_options_delete_success = 'Impostazione eliminata con successo.';  ///< 'The setting was deleted successfully.' - The string displayed upon successful deletion of an option page.
    static  $local_options_create_success = 'Impostazione creata con successo.';   ///< 'The setting was created successfully.' - The string displayed upon successful creation of an option page.
    static  $local_options_save_success = 'Le impostazioni sono state aggiornate con successo.';   ///< 'The settings were created successfully.' - The string displayed upon successful update of an option page.
    static  $local_options_save_failure = 'Le impostazioni non sono state aggiornate.';     ///< 'The settings were not updated.' - The string displayed upon unsuccessful update of an option page.
    static  $local_options_url_bad = 'This root server URL will not work for this plugin.';        ///< The string displayed if a root server URI fails to point to a valid root server.
    static  $local_options_access_failure = 'Non hai i permessi per compiere questa operazione.';  ///< 'You are not allowed to perform this operation.' - This is displayed if a user attempts a no-no.
    static  $local_options_unsaved_message = 'Hai modifiche non salvate. Sei sicuro di voler uscire senza salvarle?';   ///< 'You have unsaved changes. Are you sure you want to leave without saving them?' - This is displayed if a user attempts to leave a page without saving the options.
    static  $local_options_settings_id_prompt = 'L\'ID per questa impostazione è ';    ///< 'The ID for this Setting is ' - This is so that users can see the ID for the setting.
    static  $local_options_settings_location_checkbox_label = 'Text Searches Start Off with the "Location" Checkbox On.';   ///< This is so that users can see the ID for the setting.
    
    /// These are all for the admin page option sheets.
    static  $local_options_name_label = 'Setting Name:';                    ///< The Label for the setting name item.
    static  $local_options_rootserver_label = 'Root Server:';               ///< The Label for the root server item.
    static  $local_options_gkey_label = 'Google Maps API Key:';             ///< The Label for the Google Maps API Key item.
    static  $local_options_no_name_string = 'Enter Setting Name';           ///< The Value to use for a name field for a setting with no name.
    static  $local_options_no_root_server_string = 'Enter a Root Server URL';                               ///< The Value to use for a root with no URL.
    static  $local_options_no_new_search_string = 'Enter a New Search URL'; ///< The Value to use for a new search with no URL.
    static  $local_options_no_gkey_string = 'Enter a New API Key';          ///< The Value to use for a new search with no URL.
    static  $local_options_test_server = 'Test';                            ///< This is the title for the "test server" button.
    static  $local_options_test_server_success = 'Version ';                ///< This is a prefix for the version, on success.
    static  $local_options_test_server_failure = 'This Root Server URL is not Valid';                       ///< This is a prefix for the version, on failure.
    static  $local_options_test_server_tooltip = 'This tests the root server, to see if it is OK.';         ///< This is the tooltip text for the "test server" button.
    static  $local_options_map_label = 'Select a Center Point and Zoom Level for Map Displays';             ///< The Label for the map.
    static  $local_options_mobile_legend = 'These affect the Various Interactive Searches (such as Map, Mobile and Advanced)';  ///< This indicates that the enclosed settings are for the fast mobile lookup.
    static  $local_options_mobile_grace_period_label = 'Grace Period:';     ///< When you do a "later today" search, you get a "Grace Period."
    static  $local_options_mobile_region_bias_label = 'Region Bias:';       ///< The label for the Region Bias Selector.
    static  $local_options_mobile_time_offset_label = 'Time Offset:';       ///< This may have an offset (time zone difference) from the main server.
    static  $local_options_initial_view = array (                           ///< The list of choices for presentation in the popup.
                                                'map' => 'Map', 'text' => 'Text', 'advanced_map' => 'Advanced Map', 'advanced_text' => 'Advanced Text'
                                                );
    static  $local_options_initial_view_prompt = 'Initial Search Type:';    ///< The label for the initial view popup.
    static  $local_options_theme_prompt = 'Select a Color Theme:';          ///< The label for the theme selection popup.
    static  $local_options_more_styles_label = 'Add CSS Styles to the Plugin:';                             ///< The label for the Additional CSS textarea.
    static  $local_options_distance_prompt = 'Distance Units:';             ///< This is for the distance units select.
    static  $local_options_distance_disclaimer = 'This will not affect all of the displays.';               ///< This tells the admin that only some stuff will be affected.
    static  $local_options_grace_period_disclaimer = 'Minutes Elapsed Before A Meeting is Considered "Past" (For the fast Lookup Searches).';      ///< This explains what the grace period means.
    static  $local_options_time_offset_disclaimer = 'Hours of Difference From the Main Server (This is usually not necessary).';            ///< This explains what the time offset means.
    static  $local_options_miles = 'Miles';                                 ///< The string for miles.
    static  $local_options_kilometers = 'Kilometers';                       ///< The string for kilometers.
    static  $local_options_selectLocation_checkbox_text = 'Only Display Location Services for Mobile Devices';  ///< The label for the location services checkbox.
    
    static  $local_options_time_format_prompt = 'Time Format:';             ///< The label for the time format selection popup.
    static  $local_options_time_format_ampm = 'Ante Meridian (HH:MM AM/PM)';    ///< Ante Meridian Format Option
    static  $local_options_time_format_military = 'Military (HH:MM)';           ///< Military Time Format Option
    
    static  $local_options_google_api_label = 'Google Maps API Key:';       ///< The label for the Google Maps API Key Text Entry.
    
    static  $local_options_week_begins_on_prompt = 'Weeks begin on:';       ///< This is the label for the week start popup menu.

    static  $local_no_root_server = 'You need to provide a root server URI in order for this to work.';    ///< Displayed if there was no root server provided.

    /// These are for the actual search displays
    static  $local_select_search = 'Seleziona ricerca veloce';              ///< 'Select a Quick Search'; Used for the "filler" in the quick search popup.
    static  $local_clear_search = 'Cancella i risultati della ricerca';     ///< Clear Search Results; Used for the "Clear" item in the quick search popup.
    static  $local_menu_new_search_text = 'Nuova ricerca';                  ///< For the new search menu in the old-style BMLT search.
    static  $local_cant_find_meetings_display = 'Nessuna riunione trovata in questa ricerca'; ///< 'No Meetings Found In This Search'; When the new map search cannot find any meetings.
    static  $local_single_meeting_tooltip = 'Segui questo link per dettagli su questa riunione.'; ///< 'Follow This Link for Details About This Meeting.';The tooltip shown for a single meeting.
    static  $local_gm_link_tooltip = 'Segui questo link per visualizzare questa riunione su Google Maps.';    ///< 'Follow This Link to be Taken to A Google Maps Location for This Meeting.'; The tooltip shown for the Google Maps link.
    
    /// These are for the change display
    static  $local_change_label_date =  'Cambio data:';                     ///< 'Change Date:'; The date when the change was made.
    static  $local_change_label_meeting_name =  'Gruppo';            ///< 'Meeting Name:'; The name of the changed meeting.
    static  $local_change_label_service_body_name =  'Area:';               ///< 'Service Body:'; The name of the meeting's Service body.
    static  $local_change_label_admin_name =  'Modificato da:';             ///< 'Changed By:'; The name of the Service Body Admin that made the change.
    static  $local_change_label_description =  'Descrizione:';              ///< 'Description:'; The description of the change.
    static  $local_change_date_format = 'F j Y, \a\t g:i A';                ///< The format in which the change date/time is displayed.
    
    /// A simple message for most <noscript> elements. We have a different one for the older interactive search (below).
    static  $local_noscript = 'Questo non funzionerà, perché non hai JavaScript attivo.';             ///< 'This will not work, because you do not have JavaScript active.'; The string displayed in a <noscript> element.
    
    /************************************************************************************//**
    *                   NEW SHORTCODE STATIC DATA MEMBERS (LOCALIZABLE)                     *
    ****************************************************************************************/
    
    /// These are all for the [[bmlt_nouveau]] shortcode.
    static  $local_nouveau_advanced_button = 'Ulteriori opzioni';                ///< The button name for the advanced search in the nouveau search.
    static  $local_nouveau_map_button = 'Mostra sulla mappa anziché come lista';    ///< The button name for the map search in the nouveau search.
    static  $local_nouveau_text_button = 'Mostra come lista anziché sulla mappa';   ///< The button name for the text search in the nouveau search.
    static  $local_nouveau_text_go_button = 'VAI';                           ///< The button name for the "GO" button in the text search in the nouveau search.
    static  $local_nouveau_text_item_default_text = 'Inserisci testo della ricerca';    ///< The text that fills an empty text item.
    static  $local_nouveau_text_location_label_text = 'Questa è una località o un CAP';         ///< The label text for the location checkbox.
    static  $local_nouveau_advanced_map_radius_label_1 = 'Cerca riunioni nel raggio di';                ///< The label text for the radius popup.
    static  $local_nouveau_advanced_map_radius_label_2 = 'dal marcatore.';             ///< The second part of the label.
    static  $local_nouveau_advanced_map_radius_value_auto = 'un raggio automaticamente scelto';   ///< The second part of the label, if Miles
    static  $local_nouveau_advanced_map_radius_value_km = 'Km';                                 ///< The second part of the popup value, if Kilometers
    static  $local_nouveau_advanced_map_radius_value_mi = 'Miglia';                              ///< The second part of the popup value, if Miles
    static  $local_nouveau_advanced_weekdays_disclosure_text = 'Giorni della settimana selezionati';             ///< The text that is used for the weekdays disclosure link.
    static  $local_nouveau_advanced_formats_disclosure_text = 'Formati selezionati';               ///< The text that is used for the formats disclosure link.
    static  $local_nouveau_advanced_service_bodies_disclosure_text = 'Aree selezionate'; ///< The text that is used for the service bodies disclosure link.
    static  $local_nouveau_select_search_spec_text = 'Specificare una nuova ricerca';                    ///< The text that is used for the link that tells you to select the search specification.
    static  $local_nouveau_select_search_results_text = "Mostra i risultati dell\'ultima ricerca";  ///< The text that is used for the link that tells you to select the search results.
    static  $local_nouveau_cant_find_meetings_display = 'Nessuna riunione trovata con questa ricerca';     ///< When the new map search cannot find any meetings.
    static  $local_nouveau_cant_lookup_display = 'Non è possibile determinare la tua posizione.';          ///< Displayed if the app is unable to determine the location.
    static  $local_nouveau_display_map_results_text = 'Mostra i risultati della ricerca sulla mappa';    ///< The text for the display map results disclosure link.
    static  $local_nouveau_display_list_results_text = 'Mostra i risultati della ricerca in una lista';  ///< The text for the display list results disclosure link.
    static  $local_nouveau_table_header_array = array ( 'Nazione', 'Stato', 'County', 'Città', 'Gruppo', 'Giorno', 'Orario', 'Località', 'Formato', 'Dettagli' );
    static  $local_nouveau_weekday_long_array = array ( 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato' );
    static  $local_nouveau_weekday_short_array = array ( 'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab' );
    
    static  $local_nouveau_meeting_results_count_sprintf_format = '%s riunioni trovate';
    static  $local_nouveau_meeting_results_selection_count_sprintf_format = '%s riunioni selezionate, su %s riunioni trovate';
    static  $local_nouveau_meeting_results_single_selection_count_sprintf_format = '1 riunione selezionata, su %s riunioni trovate';
    static  $local_nouveau_single_time_sprintf_format = 'La riunione si tiene ogni %s, alle %s, e dura %s.';
    static  $local_nouveau_single_duration_sprintf_format_1_hr = '1 ora';
    static  $local_nouveau_single_duration_sprintf_format_mins = '%s minuti';
    static  $local_nouveau_single_duration_sprintf_format_hrs = '%s ore';
    static  $local_nouveau_single_duration_sprintf_format_hr_mins = '1 ora e %s minuti';
    static  $local_nouveau_single_duration_sprintf_format_hrs_mins = '%s ore e %s minuti';
    
    /// These are all variants of the text that explains the location of a single meeting (Details View).
    static  $local_nouveau_location_sprintf_format_loc_street_info = '%s, %s (%s)';
    static  $local_nouveau_location_sprintf_format_loc_street = '%s, %s';
    static  $local_nouveau_location_sprintf_format_street_info = '%s (%s)';
    static  $local_nouveau_location_sprintf_format_loc_info = '%s (%s)';
    static  $local_nouveau_location_sprintf_format_street = '%s';
    static  $local_nouveau_location_sprintf_format_loc = '%s';
    
    static  $local_nouveau_location_sprintf_format_single_loc_street_info_town_province_zip = '%s, %s (%s), %s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_street_town_province_zip = '%s, %s, %s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_street_info_town_province_zip = '%s (%s), %s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_info_town_province_zip = '%s (%s), %s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_street_town_province_zip = '%s, %s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_town_province_zip = '%s, %s, %s %s';
    
    static  $local_nouveau_location_sprintf_format_single_loc_street_info_town_province = '%s, %s (%s), %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_street_town_province = '%s, %s, %s, %s';
    static  $local_nouveau_location_sprintf_format_single_street_info_town_province = '%s (%s), %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_info_town_province = '%s (%s), %s %s';
    static  $local_nouveau_location_sprintf_format_single_street_town_province = '%s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_town_province = '%s, %s %s';
    
    static  $local_nouveau_location_sprintf_format_single_loc_street_info_town_zip = '%s, %s (%s), %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_street_town_zip = '%s, %s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_street_info_town_zip = '%s (%s), %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_info_town_zip = '%s (%s), %s %s';
    static  $local_nouveau_location_sprintf_format_single_street_town_zip = '%s, %s %s';
    static  $local_nouveau_location_sprintf_format_single_loc_town_zip = '%s, %s %s';
    
    static  $local_nouveau_location_sprintf_format_single_loc_street_info_province_zip = '%s, %s (%s), %s, %s';
    static  $local_nouveau_location_sprintf_format_single_loc_street_province_zip = '%s, %s, %s, %s';
    static  $local_nouveau_location_sprintf_format_single_street_info_province_zip = '%s (%s), %s, %s';
    static  $local_nouveau_location_sprintf_format_single_loc_info_province_zip = '%s (%s), %s, %s';
    static  $local_nouveau_location_sprintf_format_single_street_province_zip = '%s, %s, %s';
    static  $local_nouveau_location_sprintf_format_single_loc_province_zip = '%s, %s, %s';
    
    static  $local_nouveau_location_sprintf_format_single_loc_street_info_province = '%s, %s (%s), %s';
    static  $local_nouveau_location_sprintf_format_single_loc_street_province = '%s, %s, %s';
    static  $local_nouveau_location_sprintf_format_single_street_info_province = '%s (%s), %s';
    static  $local_nouveau_location_sprintf_format_single_loc_info_province = '%s (%s), %s';
    static  $local_nouveau_location_sprintf_format_single_street_province = '%s, %s';
    static  $local_nouveau_location_sprintf_format_single_loc_province = '%s, %s';
    
    static  $local_nouveau_location_sprintf_format_single_loc_street_info_zip = '%s, %s (%s), %s';
    static  $local_nouveau_location_sprintf_format_single_loc_street_zip = '%s, %s, %s';
    static  $local_nouveau_location_sprintf_format_single_street_info_zip = '%s (%s), %s';
    static  $local_nouveau_location_sprintf_format_single_loc_info_zip = '%s (%s), %s';
    static  $local_nouveau_location_sprintf_format_single_street_zip = '%s, %s';
    static  $local_nouveau_location_sprintf_format_single_loc_zip = '%s, %s';
    
    static  $local_nouveau_location_sprintf_format_single_loc_street_info = '%s, %s (%s)';
    static  $local_nouveau_location_sprintf_format_single_loc_street = '%s, %s,';
    static  $local_nouveau_location_sprintf_format_single_street_info = '%s (%s)';
    static  $local_nouveau_location_sprintf_format_single_loc_info = '%s (%s)';
    static  $local_nouveau_location_sprintf_format_single_street = '%s';
    static  $local_nouveau_location_sprintf_format_single_loc = '%s';
    
    static  $local_nouveau_location_sprintf_format_wtf = 'Nessuna località specificata';                                               ///< 'No Location Given'

    static  $local_nouveau_location_services_set_my_location_advanced_button = 'Imposta il marcatore sulla mia posizione attuale';           ///< 'Set the Marker to My Current Location'
    static  $local_nouveau_location_services_find_all_meetings_nearby_button = 'Trova riunioni vicino a me';                          ///< 'Find Meetings Near Me'
    static  $local_nouveau_location_services_find_all_meetings_nearby_later_today_button = 'Trova riunioni vicino a me oggi, più tardi';      ///< Find Meetings Near Me Later Today'
    static  $local_nouveau_location_services_find_all_meetings_nearby_tomorrow_button = 'Trova riunioni vicino a me domani';              ///< 'Find Meetings Near Me Tomorrow'

    static  $local_nouveau_location_sprintf_format_duration_title = 'Questa riunione dura % ore e %s minuti.';                  ///< 'This meeting is %s hours and %s minutes long.'
    static  $local_nouveau_location_sprintf_format_duration_hour_only_title = 'Questa riunione dura 1 ora.';                   ///< 'This meeting is 1 hour long.'
    static  $local_nouveau_location_sprintf_format_duration_hour_only_and_minutes_title = 'Questa riunione dura 1 ora e %s minuti.'; ///< 'This meeting is 1 hour and %s minutes long.'
    static  $local_nouveau_location_sprintf_format_duration_hours_only_title = 'Questa riunione dura %s ore.'; ///< 'This meeting is %s hours long.'
    static  $local_nouveau_lookup_location_failed = "La ricerca dell\'indirizzo non è stata completata con successo."; ///< "The address lookup was not completed successfully."
    static  $local_nouveau_lookup_location_server_error = "La ricerca dell\'indirizzo non è stata completata con successo a causa di un errore del server."; ///< "The address lookup was not completed successfully, due to a server error."
   static  $local_nouveau_time_sprintf_format = '%d:%02d %s';
    static  $local_nouveau_am = 'AM';
    static  $local_nouveau_pm = 'PM';
    static  $local_nouveau_noon = 'Mezzogiorno'; ///< 'Noon'
    static  $local_nouveau_midnight = 'Mezzanotte'; ///< 'Midnight'
    static  $local_nouveau_advanced_map_radius_value_array = "0.25, 0.5, 1.0, 2.0, 5.0, 10.0, 15.0, 20.0, 50.0, 100.0, 200.0";
    static  $local_nouveau_meeting_details_link_title = 'Ulteriori dettagli su questa riunione.'; ///< 'Get more details about this meeting.'
    static  $local_nouveau_meeting_details_map_link_uri_format = 'https://maps.google.com/maps?q=%f,%f';
    static  $local_nouveau_meeting_details_map_link_text = 'Visualizza la riunione sulla mappa'; ///< 'Map To Meeting'

    static  $local_nouveau_single_formats_label = 'Formati della riunione:'; ///< 'Meeting Formats:'
    static  $local_nouveau_single_service_body_label = 'Area:'; ///< 'Service Body:'

    static  $local_nouveau_prompt_array = array (
                                                'weekday_tinyint' => 'Giorno', ///< Weekday'
                                                'start_time' => 'Orario', ///< 'Start Time'
                                                'duration_time' => 'Durata', ///< 'Duration'
                                                'formats' => 'Formato', ///< 'Format'
                                                'distance_in_miles' => 'Distanza in miglia', ///< 'Distance In Miles'
                                                'distance_in_km' => 'Distanza in chilometri', ///< 'Distance In Kilometers'
                                                'meeting_name' => 'Gruppo', /// 'Meeting Name',
                                                'location_text' => 'Nome della struttura', /// 'Location Name'
                                                'location_street' => 'Indirizzo', /// Street Address
                                                'location_city_subsection' => 'Borough', ///< 'Borough'
                                                'location_neighborhood' => 'Quartiere', ///< 'Neighborhood'
                                                'location_municipality' => 'Città', ///< Town'
                                                'location_sub_province' => 'County', ///< 'County'
                                                'location_province' => 'State', ///< 'State'
                                                'location_nation' => 'Nazione', ///< 'Nation'
                                                'location_postal_code_1' => 'CAP', ///< 'Zip Code'
                                                'location_info' => 'Informazioni extra' ///< Extra Information'
                                                );
    
    /************************************************************************************//**
    *                   TABLE SHORTCODE STATIC DATA MEMBERS (LOCALIZABLE)                    *
    ****************************************************************************************/
    static  $local_table_tab_loading_title_format        = 'Getting meetings for %s';
    static  $local_table_header_time_label              = 'Time';
    static  $local_table_header_meeting_name_label      = 'Meeting Name';
    static  $local_table_header_town_label              = 'Town';
    static  $local_table_header_address_label           = 'Address';
    static  $local_table_header_format_label            = 'Format';
    static  $local_table_header_tab_title_format        = 'Display meetings for %s';
    static  $local_table_ante_meridian                  = '"AM","PM","Noon","Midnight"';
    static  $local_table_no_meetings_format             = 'No meetings on %s';
                                               
    /************************************************************************************//**
    *                      STATIC DATA MEMBERS (SPECIAL LOCALIZABLE)                        *
    ****************************************************************************************/
    
    /// This is the only localizable string that is not processed. This is because it contains HTML. However, it is also a "hidden" string that is only displayed when the browser does not support JS.
    static  $local_no_js_warning = '<noscript class="no_js">Questa ricerca non funzionerà perché il tuo browser non supporta JavaScript. Puoi, comunque, usare il <a rel="external nofollow" href="###ROOT_SERVER###">main server</a> per effettuare la ricerca.</noscript>';///< '<noscript class="no_js">This Meeting Search will not work because your browser does not support JavaScript. However, you can use the <a rel="external nofollow" href="###ROOT_SERVER###">main server</a> to do the search.</noscript>'; ///< This is the noscript presented for the old-style meeting search. It directs the user to the root server, which will support non-JS browsers.
                                   
    /************************************************************************************//**
    *                       STATIC DATA MEMBERS (NEW MAP LOCALIZABLE)                       *
    ****************************************************************************************/
    static  $local_new_map_option_1_label = 'Opzioni di Ricerca (Non si applica a meno che questa sezione non sia aperta):'; // 'Search Options (Not Applied Unless This Section Is Open):'
    static  $local_new_map_weekdays = 'Le riunioni avvengono in questi giorni della settimana:'; ///< 'Meetings Gather on These Weekdays:'
    static  $local_new_map_all_weekdays = 'Tutti i giorni della settimana'; ///<  'All'
    static  $local_new_map_all_weekdays_title = 'Trova riunioni per ogni giorno.'; ///< 'Find meetings for every day.'
    static  $local_new_map_weekdays_title = 'Trova riunioni che cadano di '; ///< 'Find meetings that occur on '
    static  $local_new_map_formats = 'Le riunioni hanno questi formati:'; ///< 'Meetings Have These Formats:'
    static  $local_new_map_all_formats = 'Tutti i formati'; ///< 'All'
    static  $local_new_map_all_formats_title = 'Trova riunioni per ogni formato.'; ///< 'Find meetings for every format.'
    static  $local_new_map_js_center_marker_current_radius_1 = 'Il cerchio è circa '; ///< 'The circle is about '
    static  $local_new_map_js_center_marker_current_radius_2_km = ' chilometri di larghezza.'; ///< ' kilometers wide.'
    static  $local_new_map_js_center_marker_current_radius_2_mi = ' miglia di larghezza.';  
    static  $local_new_map_js_diameter_choices = array ( 0.25, 0.5, 1.0, 1.5, 2.0, 3.0, 5.0, 10.0, 15.0, 20.0, 25.0, 30.0, 50.0, 100.0 );
    static  $local_new_map_js_new_search = 'Nuova ricerca'; ///< 'New Search'
    static  $local_new_map_option_loc_label = 'Immetti una località:'; ///< Enter A Location:'
    static  $local_new_map_option_loc_popup_label_1 = 'Ricerca riunioni nel raggio di'; ///< 'Search for meetings within'
    static  $local_new_map_option_loc_popup_label_2 = 'dalla località.'; ///< 'of the location.'
    static  $local_new_map_option_loc_popup_km = 'Km'; ///< 'Km'
    static  $local_new_map_option_loc_popup_mi = 'Miglia'; ///< 'Miles'
    static  $local_new_map_option_loc_popup_auto = 'una distanza scelta automaticamente';///< 'an automatically chosen distance'
    static  $local_new_map_center_marker_distance_suffix = ' dal marcatore.'; ///< ' from the center marker.'
    static  $local_new_map_center_marker_description = 'Questa è la tua località prescelta.'; ///< 'This is your chosen location.'
    static  $local_new_map_text_entry_fieldset_label = 'Inserisci un indirizzo, CAP o località'; ///< 'Enter an Address, Postcode or Location'
    static  $local_new_map_text_entry_default_text = 'Inserisci un indirizzo, CAP o località'; ///<  'Enter an Address, Postcode or Location'
    static  $local_new_map_location_submit_button_text = 'Cerca riunioni vicino a questa località'; ///< 'Search for Meetings Near This Location'

    /************************************************************************************//**
    *                       STATIC DATA MEMBERS (MOBILE LOCALIZABLE)                        *
    ****************************************************************************************/
    
    /// The units for distance.
    static  $local_mobile_kilometers = 'Chilometri'; ///< 'Kilometers'
    static  $local_mobile_miles = 'Miglia'; ///< 'Miles'
    static  $local_mobile_distance = 'Distanza';  ///< Distance (the string)
   
    /// The page titles.
    static  $local_mobile_results_page_title = 'Risultati Ricerca Veloce'; ///< 'Quick Meeting Search Results'
    static  $local_mobile_results_form_title = 'Ricerca Veloce di riunioni vicine'; ///< 'Find Nearby Meetings Quickly'    
    /// The fast GPS lookup links.
    static  $local_GPS_banner = 'Seleziona ricerca veloce'; ///<'Select A Fast Meeting Lookup'
    static  $local_GPS_banner_subtext = 'Aggiungi ai preferiti questi link per ricerche ancora più veloci in futuro.'; ///<'Bookmark these links for even faster searches in the future.'
    static  $local_search_all = 'Cerca tutte le riunioni vicine alla mia attuale località'; ///< 'Search for all meetings near my present location.';
    static  $local_search_today = 'Oggi, più tardi'; ///< 'Later Today'
    static  $local_search_tomorrow = 'Domani';    

    /// The search for an address form.
    static  $local_list_check = 'Se stai avendo delle difficoltà con la mappa interattiva, o desideri visualizzare i risultati in una lista, spunta questa casella e inserisci un indirizzo'; ///< 'If you are experiencing difficulty with the interactive map, or wish to have the results returned as a list, check this box and enter an address.';
    static  $local_search_address_single = 'Cerca riunioni vicino a un indirizzo'; ///< 'Search for Meetings Near An Address'
    
    /// Used instead of "near my present location."
    static  $local_search_all_address = 'Cerca tutte le riunioni vicine a questo indirizzo'; ///< 'Search for all meetings near this address.';
    static  $local_search_submit_button = 'Cerca le riunioni'; ///< 'Search for Meetings'
    
    /// This is what is entered into the text box.
    static  $local_enter_an_address = 'Inserisci un indirizzo';
    
    /// Error messages.
    static  $local_mobile_fail_no_meetings = 'Nessuna riunione trovata!';
    static  $local_server_fail = 'La ricerca è fallita poiché il server ha incontrato un errore!'; ///< 'The search failed because the server encountered an error!'
    static  $local_cant_find_address = 'Non riesco a individuare la località in base all\'indirizzo fornito'; ///< 'Cannot Determine the Location From the Address Information!';
    static  $local_cannot_determine_location = 'Non riesco a individuare la localizzazione corretta!';
    static  $local_enter_address_alert = 'Per favore, inserisci un indirizzo!';
    
    /// The text for the "Map to Meeting" links
    static  $local_map_link = 'Mappa della riunione';
    
    /// Only used for WML pages
    static  $local_next_card = 'Prossima riunione >>'; ///< 'Next Meeting';
    static  $local_prev_card = '<< Riunione precedente';
    
    /// Used for the info and list windows.
    static  $local_formats = 'Formati'; ///< 'Formats';
    static  $local_noon = 'Mezzogiorno'; ///< 'Noon';
    static  $local_midnight = 'Mezzanotte'; ///<'Midnight';
    
    /// This array has the weekdays, spelled out. Since weekdays start at 1 (Sunday), we consider 0 to be an error.
    static      $local_weekdays = array ( 'ERRORE', 'Domenica', 'Lunedì', 'Maartedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato' );
    static      $local_weekdays_short = array ( 'ERR', 'Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab' );
    };
?>
