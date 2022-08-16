const template = document.createElement('template');
template.innerHTML = `
<nav class="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
<div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas dark offcanvas-start" tabindex="-1" id="navbarOffcanvasLg"
        aria-labelledby="navbarOffcanvasLgLabel">
        <div class="offcanvas-header">
            <button type="button" class="btn-close offcanvas-title" 
            data-bs-dismiss="offcanvas" aria-label="Close"><h3>X</h3></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="curriculo.html">Currículo</a>
                </li>
                <li class="nav-item">
                    <a href="data_hora.html" class="nav-link active">Data/Hora</a>
                </li>
                <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Modelos3D
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item" href="esfera.html">Esfera</a></li>
                                <li><a class="dropdown-item" href="torus.html">Torus</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </ul>
            <div class="container-fluid d-flex justify-content-end flex-grow-3 pe-3">
                <a href="https://github.com/lucasfturos" target="_blank">
                    <div class="github"><ion-icon name="logo-github"></ion-icon></div>
                </a>
                <a href="https://www.linkedin.com/in/lucas-felipe-turos/" target="_blank">
                    <div class="linkedin"><ion-icon name="logo-linkedin"></ion-icon></div>
                </a>
                <a href="https://www.instagram.com/lucasfturos/" target="_blank">
                    <div class="instagram"><ion-icon name="logo-instagram"></ion-icon></div>
                </a>
            </div>
        </div>
    </div>
</div>
</nav>
`;

document.body.appendChild(template.content);