window.onload = function() {
  var body = document.getElementsByClassName('prg-bukkenHistoryRent')['0'].getElementsByClassName('historyList');
  // body['0']['tBodies']['0']['rows'] これで行が取れる
  // body['0']['tBodies']['0']['rows']['0']['cells']
  // 0: td.year
  // 1: td.space
  // 2: td.area
  // 3: td.room
  // 4: td.floor

  // HTMLElementからArrayにする
  let rows = Array.from(body['0']['tBodies']['0']['rows'])
  // Typeのsort、ミスのが多いかも。。
  // rows.sort(compareSize).sort(compareType).sort(compareFloor)
  rows.sort(compareSize).sort(compareFloor)

  // 部屋ごとの間に空行を追加
  let lastYear = '2100'
  let lastSize = rows[0]['cells'][2].textContent.slice(0, -3)

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
    } else if (row['cells'][2].textContent.slice(0, -3) != lastSize) {
      rows.splice(index, 0, emptyRow.cloneNode(true))
    }
    lastSize = row['cells'][2].textContent.slice(0, -3)
    lastYear = row['cells'][0].textContent.slice(0, 4)
  }

  // arrayからHTMLElementに戻す
  let result = document.createElement("tbody")
  for (const row of rows) {
    result.appendChild(row)
  }

  body['0'].querySelector('tbody').remove()
  body['0'].append(result)

  body[0].style.backgroundColor = '#eeeeee';
};

// 小数点第1位まであってれば同じとみなす
function compareSize(a, b) {
  if (a['cells'][2].textContent.slice(0, -3) > b['cells'][2].textContent.slice(0, -3)) return 1;
  if (b['cells'][2].textContent.slice(0, -3) > a['cells'][2].textContent.slice(0, -3)) return -1;

  return 0;
}

function compareType(a, b) {
  if (a['cells'][3].textContent > b['cells'][3].textContent) return 1;
  if (b['cells'][3].textContent > a['cells'][3].textContent) return -1;

  return 0;
}

function compareFloor(a, b) {
  if (a['cells'][4].textContent.slice(0, -1) > b['cells'][4].textContent.slice(0, -1)) return 1;
  if (b['cells'][4].textContent.slice(0, -1) > a['cells'][4].textContent.slice(0, -1)) return -1;

  return 0;
}


