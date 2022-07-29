const template = Handlebars.compile(`<ul>
<li>{{nombre}}>/li>
<li>{{apellido}}>/li>
<li>{{edad}}>/li>


</ul>`)

const htmlFinal = template({
    nombre: "Julian",
    apellido:"Torres Mendioroz",
    edad: 22,
})

document.getElementById('data').innerHTML=htmlFinal;