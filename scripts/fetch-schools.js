(function(){
    async function fecthSchools() {
        const schools = await fetch('https://api-dianpe.onrender.com/escolas/')
        console.log(schools)
    }

    fecthSchools()
}())