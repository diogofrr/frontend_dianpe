(function(){
    async function fecthSchools() {
        const result = await fetch('https://api-dianpe.onrender.com/escolas/')

        return result.json()
    }

    async function renderSchools() {
        const schoolsList = document.getElementById("schools-list")
        const li = document.createElement("li")

        li.appendChild(`<a href="<a href="product.html?id=${school.id}">${school.name}</a"></a>`)

    }
}())