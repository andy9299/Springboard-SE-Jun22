function countDown(num) {
  let interval = setInterval(function (counter) {
    num--
    if (!num) {
      console.log('DONE!')
      clearInterval(interval)
    } else {
      console.log(num)
    }
  }, 1000)
}

function randomGame() {
  let counter = 0
  let interval = setInterval(function () {
    counter++
    if (Math.random() > 0.75) {
      clearInterval(interval)
      console.log(counter)
    }
  }, 1000)
}
