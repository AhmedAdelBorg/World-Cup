const token = "36e1b067f45f40aaa3cf8022ac44f047";
const baseUrl = "https://api.football-data.org/v4/competitions/2000";

function getStandings() {
  const url = `${baseUrl}/standings`;
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const standings = response.data.standings;

      for (standing of standings) {
        let tableContent = "";
        for (row of standing.table) {
          tableContent += `
                <li class="list-group-item">
                    <div class="row">
                      <div
                        class="col-sm-4 d-flex justify-content-center align-items-center"
                      >
                        <span class="flag px-2">
                          <img
                          class="rounded-circle border border-2"
                            src="${row.team.crest}"
                            width="40px"
                            height="40px"
                          />
                        </span>
                        <h5><b>${row.team.tla}</b></h5>
                      </div>
                      <div class="col-sm-2">${row.won}</div>
                      <div class="col-sm-2">${row.lost}</div>
                      <div class="col-sm-2">${row.draw}</div>
                      <div class="col-sm-2"><b>${row.points}</b></div>
                    </div>
                  </li>
                `;
        }

        const content = `
            <div class="col-sm-6 mb-4">
            <div class="card shadow text-center border-none">
              <div class="card-header bg-primary group"><b>${standing.group}</b></div>
              <div class="row text-light bg-secondary m-0">
                <div class="col-sm-4">Team</div>
                <div class="col-sm-2">W</div>
                <div class="col-sm-2">L</div>
                <div class="col-sm-2">D</div>
                <div class="col-sm-2">Pts</div>
              </div>
              <div class="card-body">
                <ul id="list-group" class="list-group list-group-flush">
                ${tableContent}
                </ul>
              </div>
            </div>
          </div>
            `;

        document.getElementById("standings").innerHTML += content;
      }
    });
}

function getMatches() {
  const url = `${baseUrl}/matches`;
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const matches = response.data.matches;

      for (matche of matches) {
        const utcDate = matche.utcDate;
        const homeTeam = matche.homeTeam;
        const awayTeam = matche.awayTeam;

        const matcheTime = new Date(utcDate);
        const dateString =
          matcheTime.getFullYear() +
          " / " +
          (matcheTime.getUTCMonth() + 1) +
          " / " +
          matcheTime.getUTCDate() +
          " - " +
          matcheTime.getUTCHours() +
          ":" +
          matcheTime.getUTCMinutes() +
          ":" +
          matcheTime.getUTCSeconds();


          if (matche.group == null) {
            matche.group = "التصفيات"
          }
        const content = `
            <div class="col-sm-12 mt-5">
            <div class="card shadow rounded-pill">
              <div class="card-body p-0">
                <div class="row" style="height: 100px; margin-right: -28px">
                  <div
                    class="col-sm-3 bg-primary d-flex justify-content-center align-items-center"
                    style="border-right: 5px solid #2c4810"
                  >
                    <div>
                      <div class="flag">
                        <img
                          class="rounded-circle border border-2"
                          src="${homeTeam.crest}"
                          width="40px"
                          height="40px"
                        />
                      </div>
                      <h5><b>${homeTeam.tla}</b></h5>
                    </div>
                  </div>
                  <div
                    class="row col-sm-6 d-flex justify-content-center align-items-center"
                  >
                    <div class="col-sm-3">
                        <h3>${matche.score.fullTime.home ?? "-"}</h3>
                    </div>
                    <div class="col-sm-6">
                      <h6>${matche.group}</h6>
                      <h1>X</h1>
                      <h6>${dateString}</h6>
                    </div>
                    <div class="col-sm-3">
                        <h3>${matche.score.fullTime.away ?? "-"}</h3>
                    </div>
                  </div>
                  <div
                    class="col-sm-3 bg-primary d-flex justify-content-center align-items-center"
                    style="border-left: 5px solid #2c4810"
                  >
                    <div>
                      <div class="flag">
                        <img
                          class="rounded-circle border border-2"
                          src="${awayTeam.crest}"
                          width="40px"
                          height="40px"
                        />
                      </div>
                      <h5><b>${awayTeam.tla}</b></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;

        document.getElementById("matches").innerHTML += content;
      }
    });
}

getStandings();

getMatches();
