<nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
    <div class="container">
        <a class="navbar-brand" href="index.php">Start Bootstrap</a>
        <button class="navbar-toggler text-uppercase font-weight-bold text-white rounded" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive"
            aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars fa-2x"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">

            <ul class="navbar-nav ms-auto">
                <li class="nav-item dropdown">
                    <a class="nav-link py-3 px-0 px-lg-3  dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu bg-secondary text-uppercase border-0 " aria-labelledby="navbarDropdown">
                        <a class="dropdown-item text-white" href="#">Action</a>
                        <a class="dropdown-item text-white" href="#">Another action</a>
                        <a class="dropdown-item text-white" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item mx-0 mx-lg-1"><a
                        class="nav-link <?php if ($CURRENT_PAGE == "Index") {?>active<?php }?> py-3 px-0 px-lg-3 rounded"
                        href="index.php">Portfolio</a></li>
                <li class="nav-item mx-0 mx-lg-1"><a
                        class="nav-link <?php if ($CURRENT_PAGE == "About") {?>active<?php }?> py-3 px-0 px-lg-3 rounded"
                        href="about.php">About</a></li>
                <li class="nav-item mx-0 mx-lg-1"><a
                        class="nav-link <?php if ($CURRENT_PAGE == "Contact") {?>active<?php }?> py-3 px-0 px-lg-3 rounded"
                        href="contact.php">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>