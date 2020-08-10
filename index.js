const toggleLoader = () => {
    let preloader = document.querySelector('.preloader')
    if (isLoading()) {
        preloader.remove()
    } else {
        preloader = document.createElement('div')
        preloader.className = 'preloader'
        preloader.innerHTML = '<img src="./preloader.gif">'
        document.body.append(preloader)
    }
}

const isLoading = () => document.querySelector('.preloader') ? true : false

const table = selector => {
    const node = document.querySelector(selector)
    const data = [
        '/data/cars-1.json',
        '/data/cars-2.json',
        '/data/cars-3.json',
        '/data/cars-4.json',
        '/data/cars-5.json'
    ]
    return async function* () {
        for (let i = 0; i < data.length; i++) {
            toggleLoader()
            let rows
            // Искуственная задержка чтобы увидеть прелоадер
            setTimeout(async () => {
                rows = await getRows(data[i])
                toggleLoader()
                node.insertAdjacentHTML('beforeend', rows)
            }, 1000);
            yield
        }
    }()
}

const getRows = async url => {
    const data = await getData(url)
    return data.map(row => tableRow(row)).join('')
}

const tableRow = data => `
        <div class="table__row">
            <div class="table__cell">${data.Name || '-'}</div>
            <div class="table__cell">${data.Miles_per_Gallon || '-'}</div>
            <div class="table__cell">${data.Cylinders || '-'}</div>
            <div class="table__cell">${data.Displacement || '-'}</div>
            <div class="table__cell">${data.Horsepower || '-'}</div>
            <div class="table__cell">${data.Weight_in_lbs || '-'}</div>
            <div class="table__cell">${data.Acceleration || '-'}</div>
            <div class="table__cell">${data.Year || '-'}</div>
            <div class="table__cell">${data.Origin || '-'}</div>
        </div>
    `

const getData = url => fetch(url).then(d => d.json())

const scrollTable = table('.table')
scrollTable.next()

window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (!isLoading()) scrollTable.next()
    }
}