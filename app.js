// *******************************************************************
        // **********************************************
                //   ***************************
                        //   **************
                                //  ****

                // code by Kewal Krishna Pandey pokemon API ultilization                





                async function fetchData(lcnt, hcnt) {
                    let data = new Array();
                    try {
                        for (let i = lcnt; i < hcnt; i++) {
                            let result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
                            let formattedData = result.data;
                            data.push(formattedData)
                        }
                        return data
                    } catch (e) {
                        return e;
                    }
                }
                async function asyncCalling(lcnt, hcnt) {
                    try {
                        let data = await fetchData(lcnt, hcnt);
                        images(data, lcnt, hcnt);
                    } catch (e) {
                        console.log(e);
                    }
                }
                asyncCalling(200, 210);
                
                function images(data, lcnt, hcnt) {
                    let eachDiv = document.querySelector(".each-poke");
                    let section = document.querySelector(".pokemons");
                    let fakeModal = document.querySelector(".fake-modal");
                    let body = document.querySelector("body");
                    let button = document.querySelector(".fake-modal-button")
                    let i = lcnt;
                    for (let images of data) {
                        let newModal = fakeModal.cloneNode(true)
                        newModal.id = "exampleModal" + i;
                        newModal.classList.remove("d-none", "fake-modal");
                        newModal.childNodes[1].childNodes[1].childNodes[1].childNodes[1].innerText = capitalize(images.forms[0].name);
                        newModal.childNodes[1].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[1].innerHTML += images.weight;
                        newModal.childNodes[1].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[3].innerHTML += images.base_experience;
                        newModal.childNodes[1].childNodes[1].childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[5].innerHTML += +images.height;
                        let ulStats = newModal.childNodes[1].childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[3];
                        for (stat of images.stats) {
                            let newli = document.createElement("li");
                            let span1 = document.createElement("span")
                            span1.innerHTML = stat.base_stat;
                            let span2 = document.createElement("span")
                            span2.innerHTML = stat.effort;
                            let span3 = document.createElement("span")
                            span3.innerHTML = stat.stat.name;
                            newli.appendChild(span3)
                            newli.appendChild(span1)
                            newli.appendChild(span2)
                            ulStats.appendChild(newli)
                        }
                        body.insertBefore(newModal, fakeModal);
                        let newDiv = eachDiv.cloneNode(true);
                        newDiv.classList.remove("d-none")
                        newDiv.childNodes[3].childNodes[1].src = images.sprites.front_default;
                        newModal.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].src = images.sprites.front_default;
                        newDiv.childNodes[1].innerText = "#" + i;
                        newDiv.childNodes[5].childNodes[1].innerText = capitalize(images.forms[0].name);
                        let abilitiesUl = newDiv.childNodes[7].childNodes[3];
                        for (ability of images.abilities) {
                            let newli = document.createElement("li");
                            newli.innerText = ability.ability.name;
                            abilitiesUl.appendChild(newli);
                        }
                        let newButton = button.cloneNode(true);
                        newButton.setAttribute("data-bs-target", "#exampleModal" + (i++));
                        newDiv.childNodes[5].appendChild(newButton);
                        newDiv.addEventListener("click", () => {
                            newButton.click();
                        })
                        section.appendChild(newDiv);
                    }
                    return;
                }
                // capitalizing the first alphabet of every word
                const capitalize = (s) => {
                    if (typeof s !== 'string') return ''
                    return s.charAt(0).toUpperCase() + s.slice(1)
                }
                let pokemons = document.querySelector(".pokemons");
                let starting = -1000;
                let lcnt = 210;
                let hcnt = 220;
                // this is the function call upon scrolling the page to the bottom and for infinite AJAX loading
                let func = () => {
                    if (pokemons.getBoundingClientRect().top < starting) {
                        asyncCalling(lcnt, hcnt);
                        starting -= 1000;
                        lcnt += 10;
                        hcnt += 10;
                        return
                    }
                }
                window.onscroll = func;