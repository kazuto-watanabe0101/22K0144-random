window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.user-name').forEach((elem) => {
      elem.addEventListener('click', (event) => {
        alert(event.target.innerHTML);
      });
    });
  
    document.querySelector('.send-button').addEventListener('click', (event) => {
      const text = document.querySelector('.input-text').value;
      fetch('/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: text }) })
    });

    document.querySelector('.random-button').addEventListener('click', async (event) => {
      try {
        const response = await fetch('/api/random');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        alert(`ランダムに選ばれたユーザー: ${data.user}`);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    });
  });
