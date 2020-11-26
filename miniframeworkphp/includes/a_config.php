<?php
	switch ($_SERVER["SCRIPT_NAME"]) {
		case "/work.php":
			$CURRENT_PAGE = "Work"; 
			$PAGE_TITLE = "Work";
			break;
		case "/results.php":
			$CURRENT_PAGE = "Results"; 
			$PAGE_TITLE = "Results";
			break;
		case "/methods.php":
			$CURRENT_PAGE = "Methods"; 
			$PAGE_TITLE = "Methods";
			break;
		case "/about.php":
			$CURRENT_PAGE = "About"; 
			$PAGE_TITLE = "About Us";
			break;
		case "/contact.php":
			$CURRENT_PAGE = "Contact"; 
			$PAGE_TITLE = "Contact Us";
			break;
		default:
			$CURRENT_PAGE = "Index";
			$PAGE_TITLE = "Welcome to my homepage!";
	}
?>