/*#####################################################################################################################################################
################ PLEASE BE CAREFUL. USE THE FACTS SIS API SANDBOX FOR TESTING. DO NOT DESTROY YOUR SIS DATA. ##########################################
#######################################################################################################################################################
################ INSTRUCTIONS. ########################################################################################################################
#######################################################################################################################################################
1. Populate a Google Sheet with FACTS personID numbers in Column "A" and new values for an attribute in Column "B". No header row. 
2. Update variables below. This code has been written to modify a single attribute in a user profile and has been tested and used successfully to modify 
   email addresses. This has not been tested on child values or on multiple values but may work with minor code changes.
3. Run the 'push' function. Each row of the sheet will be converted to a discrete API request. Request options are logged to aid in troubleshooting. 
4. Verify changes in the SIS.
#######################################################################################################################################################
################ UPDATE THE FOLLOWING VARIABLES BEFORE RUNNING THIS SCRIPT. ###########################################################################
#####################################################################################################################################################*/
const WORKBOOK = ''; // ID of Sheets workbook file.
const SHEET = 'Sheet1'; // ID of individual sheet.
const SUBKEY = ''; // FACTS API Subscription Key.
const APIKEY = ''; // FACTS API Key.
const PATH = 'email' // Profile attribute you are changing. Same as path but with out the leading slash.
/*#####################################################################################################################################################
################ O EDITS REQUIRED BELOW THIS LINE OR IN OTHER FILES. ##################################################################################
#####################################################################################################################################################*/
function push() {
  // Open Google Sheet file and target sheet then get the values from the target sheet.
  let ss = SpreadsheetApp.openById(WORKBOOK);
  let sheet = ss.getSheetByName(SHEET);
  let values = sheet.getDataRange().getValues();
  // Loop through values from sheet, send a PATCH request to the API using id and new value. 
  for (let i = 0; i < values.length; i++ ){
    let peopleUrl = 'https://api.factsmgt.com/People/' + values[i][0] + '?api-version=1';
    let payload = "[{\"" + "path" + "\":\"/" + PATH + "\",\"" + "op" + "\":\"" + "add" + "\",\"" + "value" + "\":\"" + values[i][1] + "\"}]";
    let options = {
      muteHttpExceptions : false,
      method : 'PATCH',
      contentType : 'application/json',
      headers : {
      'Ocp-Apim-Subscription-Key' : SUBKEY,
      'Facts-Api-Key' : APIKEY
      },
      payload : (payload)
    };
    // Log fetch request options for troubleshooting and reference.
    Logger.log(`Row: ${i + 1}`);
    Logger.log(options);
    let peopleResult = UrlFetchApp.fetch(peopleUrl, options);
    let resultText = peopleResult.getContentText();
    let resultJSON = JSON.parse(resultText);
  };
}
/*#####################################################################################################################################################
################ FIN! #################################################################################################################################
#####################################################################################################################################################*/
