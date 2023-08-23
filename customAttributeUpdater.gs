//##############################################################################################
// THIS CODE REQUIRES YOU TO ADD A SERVICE IN YOUR GOOGLE APPS SCRIPT PROJECT:
// ADMIN SDK API (IDENTIFIER: 'AdminDirectory')
//##############################################################################################
// PLEASE SUPPLY THE VALUES FOR THE VARIABLES BELOW. ###########################################
//##############################################################################################
// COPY AND PASTE THE SPREADSHEET ID OF THE LINKED SPREADSHEET BELOW. (Between quotes.)
const SPREADSHEET_ID = "1tGFtAJy4PU23k5_MXhytu-xZRcFYnSqmwCPB-gBOgjE";
// COPY AND PASTE THE NAME OF THE FORM RESPONSE BELOW. (Between quotes.)
const SHEET_ID = "formResponses";
// COPY AND PASTE THE GOOGLE WORKSPACE CUSTOM ATTRIBUTE 'CATEGORY' BELOW. (Between quotes.)
const CUSTOM_SCHEMA_NAME = "Identity";
// COPY AND PASTE THE GOOGLE WORKSPACE CUSTOM ATTRIBUTE 'CATEGORY' BELOW. (Between quotes.)
const CUSTOM_ATTRIBUTE = "idBadgeNumber";
//##############################################################################################
// NOTHING TO CHANGE BELOW THIS LINE. ##########################################################
//##############################################################################################
function postNewCustomAttributeValue() {
  // Open the spreadsheet, the sheet, then get the most recent response. 
  // Used in conjunction with a submission trigger.
  const RESPONSES_SS = SpreadsheetApp.openById(SPREADSHEET_ID);
  const RESPONSES = RESPONSES_SS.getSheetByName(SHEET_ID);
  let rowValues = RESPONSES.getRange('A1:A').getValues();
  let rowCounter = 0;
  while(rowValues[rowCounter] && rowValues[rowCounter][0] != ""){
    rowCounter++;
  };
  let newCustomAttributeValueCell = 'C' + rowCounter;
  let userAccountCell = 'B' + rowCounter;
  const values = RESPONSES.getRange(newCustomAttributeValueCell + ':' + userAccountCell).getValues();
  // Attempt to update the custom attribute value for the user.
  try {
    let status = "The " + CUSTOM_ATTRIBUTE + " has not been changed.";
    let update = '{' + '"customSchemas": {' + CUSTOM_SCHEMA_NAME + ' : {' + CUSTOM_ATTRIBUTE + ' : ' + values[0][1] + '}}}';
    status = AdminDirectory.Users.update(update, values[0][0]);
    if (status != "The " + CUSTOM_ATTRIBUTE + " has not been changed."){
      status = "The " + CUSTOM_ATTRIBUTE + " for " + values[0][0] + " was succesfully changed to:" + values[0][1] + ".";
      console.log(status);
    };
  } catch(error) {
    console.log(error.message)
  };
};
//##############################################################################################
// FIN! ########################################################################################
//##############################################################################################
