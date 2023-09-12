(function(){
    async function fetchSchools() {
        try {
            const result = await fetch('https://api-dianpe.onrender.com/escolas/')    
        } catch (error) {
            console.log(error.message)
        }

        return result.json()
    }

    function schoolCardTemplate(href, schoolName, schoolImg, schoolImgAlt) {
        return (`
            <a href="${href}" class="schoolsCardSection__schoolLink">
                <li class="schoolsCardSection__school">
                    <img class="schoolsCardSection__img" alt="${schoolImgAlt}" />
                    <p class="schoolsCardSection__schoolDesc">
                        <b>${schoolName}</b>
                    </p>
                </li>
            </a>
        `)
    }

    async function renderSchools() {
        const schoolsList = document.getElementById("schools__list")
        const schoolsData = await fetchSchools()

        console.log(schoolsData)
    }

    
}())

