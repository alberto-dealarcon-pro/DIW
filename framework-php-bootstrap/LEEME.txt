Cuando publicamos proyectos en GIT, es conveniente crear un fichero .gitnore para que no se suban
al repositorio los paquetes externos de node. Cuando descarguéis de GITHUB este proyecto, observar
que la carpeta node_modules aún no existe.

Para instalar los paquetes de los que depende el proyecto (incluidos en package.json) una vez 
descargado de GITHUB este ejemplo, es necesario realizar los siguientes pasos:

1. Abrir con Visual Studio Code la carpeta del ejemplo.

2. Instalar las dependecias de paquetes, en este caso se instalará Boostrap. Para ello abrir un terminal
y ejecutar el siguiente comando:

npm install

Esto instalará en la carpeta "node_modules" todos los paquetes especificados en package.json.

Una vez hecho esto, ya podemos compilar los ficheros scss con el comando:

sass -w scss:css

