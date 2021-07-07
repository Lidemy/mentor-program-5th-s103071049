const btn = document.querySelector('.btn__update-nickname')

if (btn) {
	btn.addEventListener('click', (e) => {
	  document.querySelector('.update__nickname-block').classList.toggle('hide')
    })
}
