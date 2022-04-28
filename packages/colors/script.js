// get color values from https://www.w3.org/TR/css-color-4/

const getTableData = (table) => {
  const rows = Array.from(table.querySelectorAll('tbody tr'))
  const header = Array.from(table.querySelectorAll('thead tr'))

  const headerData = header
    .map((row) => {
      const cells = Array.from(row.querySelectorAll('th'))
      return cells.map((cell) =>
        cell.textContent.replace(/\s/g, '').toLowerCase()
      )
    })
    .flat()
  // remove "colorname" from headerData as we get the name from the style
  // attribute
  const index = headerData.indexOf('colorname')
  headerData.splice(index, 1)

  const data = rows.map((row) =>
    Array.from(row.querySelectorAll('td')).map((cell) => {
      let text = cell.textContent.trim()
      if (!text) text = cell.style.backgroundColor
      return text
    })
  )

  return data.map((row) => {
    const color = {}
    row.forEach((cell, i) => {
      const key = headerData[i]

      color[key] = cell

      if (key === 'decimal') {
        color[key] = cell.split(' ').map((c) => Number(c))
      }
    })

    return color
  })
}

// further data processing
;(() => {
  const table = document.querySelector('table.named-color-table')
  const obj = {}
  getTableData(table).forEach((d) => {
    obj[d.named] = d.decimal
  })

  console.log(obj)
})()
