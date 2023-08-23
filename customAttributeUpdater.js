//##############################################################################################
// THIS CODE REQUIRES YOU TO "ADD A SERVICE" IN YOUR GOOGLE APPS SCRIPT PROJECT:
// THE "ADMIN SDK API" (IDENTIFIER: 'AdminDirectory')
//##############################################################################################
// PLEASE SUPPLY THE VALUES FOR THE VARIABLES BELOW. ###########################################
//##############################################################################################
// COPY AND PASTE THE SPREADSHEET ID OF THE LINKED SPREADSHEET BELOW. (Between quotes.)
const SPREADSHEET_ID = "";
// COPY AND PASTE THE NAME OF THE FORM RESPONE BELOW. (Between quotes.)
const SHEET_ID = "";
// COPY AND PASTE THE GOOGLE WORKSPACE CUSTOM ATTRIBUTE 'CATEGORY' BELOW. (Between quotes.)
const CUSTOM_SCHEMA_NAME = "";
// COPY AND PASTE THE GOOGLE WORKSPACE CUSTOM ATTRIBUTE 'CATEGORY' BELOW. (Between quotes.)
const CUSTOM_ATTRIBUTE = "";
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
  let newCustomAttributeValueCell = 'B' + rowCounter;
  let userAccountCell = 'C' + rowCounter;
  const values = RESPONSES.getRange(newCustomAttributeValueCell + ':' + userAccountCell).getValues();
  // Attempt to update the custom attribute value for the user.
  try {
    let status = "The " + CUSTOM_ATTRIBUTE + " has not been changed.";
    status = AdminDirectory.Users.update({
      "customSchemas": {
        CUSTOM_SCHEMA_NAME : {
          CUSTOM_ATTRIBUTE : values[0][0]
        }
      }
    }, values[0][1]);
    if (status != "The " + CUSTOM_ATTRIBUTE + " has not been changed."){
      status = "The " + " for " + userAccount + " was succesfully changed to:" + newValue + ".";
      console.log(status);
    };
  } catch(error) {
    console.log(error.message)
  };
};
//##############################################################################################
// FIN! ########################################################################################
//##############################################################################################
