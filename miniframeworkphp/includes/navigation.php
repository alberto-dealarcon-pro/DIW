<nav class="main-nav">
  <div class="container">
    <ul>
      <li class="mobile-button"><a href="#">Menu</a></li>
    <li><a href="about.php" <?php if ($CURRENT_PAGE == "About") { echo "class=\"active\""; } ?>>About Us</a></li>
    <li><a href="work.php" <?php if ($CURRENT_PAGE == "Work") { echo "class=\"active\""; } ?>>Work</a></li>
    <li><a href="methods.php" <?php if ($CURRENT_PAGE == "Methods") { echo "class=\"active\""; } ?>>Methods</a></li>
    <li><a href="results.php" <?php if ($CURRENT_PAGE == "Results") { echo "class=\"active\""; } ?>>Results</a></li>
    <li><a href="contact.php" <?php if ($CURRENT_PAGE == "Contact") { echo "class=\"active\""; } ?>>Contact</a></li>
  </ul>
  </div>
</nav>
<!--
<div class="container">
	<ul class="nav nav-pills">
	  <li class="nav-item">
	    <a class="nav-link <?php if ($CURRENT_PAGE == "Index") {?>active<?php }?>" href="index.php">Home</a>
	  </li>
	  <li class="nav-item">
	    <a class="nav-link <?php if ($CURRENT_PAGE == "About") {?>active<?php }?>" href="about.php">About Us</a>
	  </li>
	  <li class="nav-item">
	    <a class="nav-link <?php if ($CURRENT_PAGE == "Contact") {?>active<?php }?>" href="contact.php">Contact</a>
	  </li>
	</ul>
</div>
-->