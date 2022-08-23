/*
*Hi There! My Name is Johannes Anih,
*And I'm a web developer and i'm sure you are a developer also
*If not why are you checking my code?
*Well you are free to check and use the code because it is open source.
*This just one of my ideas, it's actually a color checker and separator
*The code is heabily commented so you will understand what is going on down there

*I wish you safe journey going through my code :)
*/


//////////---BEGINNING OF PROGRAM---/////////////////////////////////////////////////

function $(selector) { 

	//$ is a function that enable you to select DOM elements with CSS like selectors
	return document.querySelector(selector);
}

//Storing needed DOM elements in variables

var red_inp = $("#red-input"), green_inp = $("#green-input"), blue_inp = $("#blue-input");
var red_box = $("#red-box"), green_box = $("#green-box"), blue_box = $("#blue-box");
var color_result = $("#color");
var createColorBTN = $("#createColorBTN");

//---------------------------------------------

function createColor() {

	//createColor() is the main function that runs the program

	//Creating an array called valueArray and a variable called called colorCode
	var valueArray = [], colorCode;

	//-- valueArray -> This array will be holding the values from the inputs
	//colorCode -> This variable will hold the final color code result

	//-------------------------------------------

	// Creating Regular expressions, which will be used to match the type of color code whether it is an RGB color code or a HEX color code

	var rgbMatch = /\d{1,3},\d{1,3},\d{1,3}/;
	var hexMatch = /#{1}\d{0,2}[a-zA-z]{0,2}\d{0,2}[a-zA-z]{0,2}\d{0,2}[a-zA-z]{0,2}/;

	//--------------------------------------------

	//-------------------CODE BLOCK <1>-----------------------------//

	/*
	This block of code validates the inputs to check if it contains any values, if it
	doesn't contain any value or if only one of it contains no value, it alerts the user to complete his/her color code entry.

	But if they all contain values, it pushed those values into the valueArray
	*/


	if(red_inp.value.length == 0 || green_inp.value.length == 0 || blue_inp.value.length == 0) { //if one or more inputs are empty
		alert("Complete your color code"); //alerts user to complete code entry
	} else { //else
		valueArray.push(red_inp.value); //Pushes the input value for red into the array
		valueArray.push(green_inp.value); //Pushes the input value for green into the array
		valueArray.push(blue_inp.value); //Pushes the input value for blue into the array
	}

	//---------------END OF CODE BLOCK <1>---------------------------------------------//

	//--------------CODE BLOCK <2>----------------------------------------------//

	if(valueArray.length !== 0) {

		/*
		*Character identities used in this program
		*0 -> letters
		*1 -> numbers
		*/

		stringTypeCatcher = []; //stringTypeCatcher is an array that collects the identitites of the type of character that are available iin the valueArray

		for(var i = 0; i < valueArray.length; i++)  { //A loop is started that loops through all the characters in the valueArray

			if(/[a-zA-z]/.test(valueArray[i])) { //This tests if a member of valueArray which is valueArray[i] in the valueArray is an alphabet either lowercase or UPPERCASE,

				stringTypeCatcher.push(0); // and if true it pushes 0 into the stringTypeCatcher array, because in this program 0 stands for an alphapbet

			} else if(/\d/.test(valueArray[i])) { // This "else if" part tests if a member of valueArray which is valueArray[i] in the valueArray is a digit or a number,

				stringTypeCatcher.push(1); // and if true it pushes 1 into the stringTypeCatcher array, because in this program 1 stands for a number or digit

			}

		}

		/*
		*By the end of this code block, the stringTypeCatcher array would be containing three values for example depending on the case and the color code entered, the stringTypeCatcher should be looking like something close to this: [1,0,1] or [0,0,0] or [1,1,1] or [0,1,1] .... any how depends on where the loop encounters a number or an alphabet and then pushed 0 or 1 into the stringTypeCatcher.

		*The values in this stringTypeCatcher array would be used in the next code block to determine and check if the user entered an RGB code or a HEX code,
		*/

	//----------END OF CODE BLOCK <2>---------------------------------------------//


	//--------------CODE BLOCK <3>----------------------------------------------//

	/*
	*In this block of code, the 0 and 1 identities are checked if they are in the array
	*REMEMBER: that in this program 0 stands for alphabets, 1 stands for numbers

	*If there are only 1s in the array e.g [1,1,1] that means that the user entered an RGB code, RGB color code are made up of only numbers

	*If there are only 0s in the array e.g [0,0,0] that means that the user entered a HEX code, which is possible to only contain letters only

	*If there is a mix of 1s and 0s that means the user entered a HEX code, which again can still contain bothe letters and numbers

	-------
	*All of these are tested using indexOf() method in javascript, any character that is missing it returns -1, so with this and a set of conditions we can check if there are 0s or 1s in the stringTypeCatcher array.

	NOTICE: that the stringTypeCatcher array is joined before parforming the check, this makes it easier, for example after using the join() method on the stringTypeCatcher array, if the array is like this -> [0,1,0] it would become this "010" BUT THIS DOES NOT CHANGE THE VALUE OF THE stringTypeCatcher array, AS THE ARRAY ITSELF IS STILL PRESERVED AFTER join()
	-------

	*/

		if(stringTypeCatcher.join("").indexOf(0) !== -1 && stringTypeCatcher.join("").indexOf(1) !== -1) {
			colorCode = "#" + valueArray.join("");
		} else if(stringTypeCatcher.join("").indexOf(0) !== -1 && stringTypeCatcher.join("").indexOf(1) == -1) {
			colorCode = "#" + valueArray.join("");
		} else if(stringTypeCatcher.join("").indexOf(0) == -1 && stringTypeCatcher.join("").indexOf(1) !== -1) {
			colorCode = valueArray.join(",");
		}

		var valueArray = new Array(); //This empties the valueArray, VERY NECCESSARY
		var stringTypeCatcher = new Array(); //This empties the valueArray, VERY NECCESSARY

		//An array is emptied by redeclaring it, empting and array is neccessary after the process has finished, if not, when the program is runs again, it would push in new values to these arrays right on top of the old one and would produce bad results which can possibly make your program run imporperly.

	}

	////----------END OF CODE BLOCK <3>---------------------------------------------//

	//--------------CODE BLOCK <3>----------------------------------------------//

	//This block of code, handles the final color code value and uses this value to style the background colors of the color boxes in the application, and also seperated the thr color code into its Red, Green, Blue componenets

	if(colorCode.length !== 0) { //Checks if the there is any value assigned to the color codes

		//If True

		if(rgbMatch.test(colorCode)) { //It then Checks if the color code is an RGB color code using the RegEx variable created at the top of this code

			//If True

			color_result.style.backgroundColor = "rgb("+colorCode+")"; //It then styles the background color of the color_result box

			//and also separates the colors by

			red_box.style.backgroundColor = "rgb("+red_inp.value+",0,0)"; //styling the red box background color using the input value from the red input
			green_box.style.backgroundColor = "rgb("+green_inp.value+",0,0)"; //styling the green box background color using the input value from the green input
			blue_box.style.backgroundColor = "rgb("+blue_inp.value+",0,0)"; //styling the blue box background color using the input value from the blue input


		} else if(hexMatch.test(colorCode)) {//But if it is a HEX and not RGB code

			color_result.style.backgroundColor = colorCode; //It firsts of all styles the background color of the color_result box

			//Then check if the HEX color code is shorthand or full
			//Example for shorthand -> #fff, #000, #eee
			//Example for full -> #ffffff, #000000, #eeeeee

			if(red_inp.value.length == 2 || green_inp.value.length == 2 || blue_inp.value.length == 2) { //This checkes if it is full HEX code

				//Then it separetes the colors

				red_box.style.backgroundColor = "#"+red_inp.value+"0000"; //styling the red box background color using the input value from the red input
				green_box.style.backgroundColor = "#00"+green_inp.value+"00"; //styling the green box background color using the input value from the green input
				blue_box.style.backgroundColor = "#0000"+blue_inp.value+""; //styling the blue box background color using the input value from the blue input

			} else if(red_inp.value.length == 1 || green_inp.value.length == 1 || blue_inp.value.length == 1) { //This checks if it is a shorthand HEX code

				//Then it separates the colors

				red_box.style.backgroundColor = "#"+red_inp.value+"00"; //styling the red box background color using the input value from the red input
				green_box.style.backgroundColor = "#0"+green_inp.value+"0"; //styling the green box background color using the input value from the green input
				blue_box.style.backgroundColor = "#00"+blue_inp.value+""; //styling the blue box background color using the input value from the blue input

			}

		}

	}

	//-----------END CODE BLOCK <3>----------------------------------------------//


	/*And thats all, I hope you understand this well, bye*/

	/*
	If you have any website developemnt job call or whatsapp me at 08069355436, I give 20% commision of whatever the clients pays to whoever get's me a client. See Ya! once again :) and if you are girl MWAAA, I didn't do that chroma did.
	*/

}

//////////---END OF PROGRAM---///////////////////////////////////////////////////////////