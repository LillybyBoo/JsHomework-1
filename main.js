const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    attack: function(){
        console.log(this.name +' '+ 'Fight...')
    },
    };

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    attack: function(){
        console.log(this.name +' '+ 'Fight...')
    },
    };



    function createPlayer(gameClass, obj) {
        const div = document.createElement("div");
        div.classList.add(gameClass);
        div.innerHTML = `
          <div class="progressbar">
              <div class="life">${obj.hp}</div>
              <div class="name">${obj.name}</div>
          </div>
          <div class="character">
              <img src="${obj.img}" />
          </div>`;
        const arenas = document.querySelector(".arenas");
      
        arenas.append(div);
      }






















