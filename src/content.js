window.onload = function() {
  if (document.getElementsByClassName('prg-bukkenHistoryRent')['0']) {
    var body = document.getElementsByClassName('prg-bukkenHistoryRent')['0'].getElementsByClassName('historyList');
    // body['0']['tBodies']['0']['rows'] これで行が取れる
    // body['0']['tBodies']['0']['rows']['0']['cells']
    // 0: td.year
    // 1: td.space (price)
    // 2: td.area
    // 3: td.room
    // 4: td.floor

    // HTMLElementからArrayにする
    let rows = Array.from(body['0']['tBodies']['0']['rows'])
    // Typeのsort、ミスが多いので使わない
    // rows.sort(compareSize).sort(compareType).sort(compareFloor)
    rows.sort(compareSize).sort(compareFloor)

    // 部屋ごとの間に空行を追加
    let lastYear = '2100'
    let lastSize = rows[0]['cells'][2].textContent.slice(0, -3)
    let lastFloor = rows[0]['cells'][4].textContent.slice(0, -1)

    let emptyRow = document.createElement('tr')
    emptyRow.style.backgroundColor = '#ffffff'
    let emptyTd = document.createElement('td')
    emptyTd.textContent = ''
    emptyRow.appendChild(emptyTd.cloneNode(true))
    emptyRow.appendChild(emptyTd.cloneNode(true))
    emptyRow.appendChild(emptyTd.cloneNode(true))
    emptyRow.appendChild(emptyTd.cloneNode(true))
    emptyRow.appendChild(emptyTd.cloneNode(true))

    for (const [index, row] of rows.entries()) {
      if (row['cells'][0].textContent.slice(0, 4) > lastYear) {
        rows.splice(index, 0, emptyRow.cloneNode(true))
      } else if (Math.abs(parseFloat(row['cells'][2].textContent.slice(0, -2)) - parseFloat(lastSize)) >= 0.1) {
        rows.splice(index, 0, emptyRow.cloneNode(true))
      } else if (row['cells'][4].textContent.slice(0, -1) != lastFloor) {
        rows.splice(index, 0, emptyRow.cloneNode(true))
      }
      lastYear = row['cells'][0].textContent.slice(0, 4)
      lastSize = row['cells'][2].textContent.slice(0, -2)
      lastFloor = row['cells'][4].textContent.slice(0, -1)
    }

    // arrayからHTMLElementに戻す
    let result = document.createElement("tbody")
    for (const row of rows) {
      let aveTd = document.createElement('td')
      let average = ''
      if (row['cells'][1].textContent != '') {
        average = parseInt((parseFloat(row['cells'][1].textContent.split('万')[0]) * 10000) / parseFloat(row['cells'][2].textContent))
      }
      aveTd.textContent = average
      row.appendChild(aveTd)

      result.appendChild(row)
    }

    body['0'].querySelector('tbody').remove()
    body['0'].append(result)

    body[0].style.backgroundColor = '#eeeeee';
  }
};

// 差が0.1未満なら同じと見なす
function compareSize(a, b) {
  if (Math.abs(parseFloat(a['cells'][2].textContent.slice(0, -2)) - parseFloat(b['cells'][2].textContent.slice(0, -2))) < 0.1 ) return 0;

  if (parseFloat(a['cells'][2].textContent.slice(0, -3)) > parseFloat(b['cells'][2].textContent.slice(0, -3))) return 1;
  if (parseFloat(b['cells'][2].textContent.slice(0, -3)) > parseFloat(a['cells'][2].textContent.slice(0, -3))) return -1;

  // return 0;
}

function compareType(a, b) {
  if (a['cells'][3].textContent > b['cells'][3].textContent) return 1;
  if (b['cells'][3].textContent > a['cells'][3].textContent) return -1;

  return 0;
}

function compareFloor(a, b) {
  if (parseInt(a['cells'][4].textContent.slice(0, -1)) > parseInt(b['cells'][4].textContent.slice(0, -1))) return 1;
  if (parseInt(b['cells'][4].textContent.slice(0, -1)) > parseInt(a['cells'][4].textContent.slice(0, -1))) return -1;

  return 0;
}


