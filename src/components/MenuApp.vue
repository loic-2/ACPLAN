<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div class="position-sticky pt-3">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <router-link to="/" class="nav-link">
                                    <i class="fa-solid fa-chart-line"></i>
                                    Tableau de bord
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/client" class="nav-link">
                                    <i class="fa-solid fa-users"></i>
                                    Clients
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/personnel" class="nav-link">
                                    <i class="fa-solid fa-users"></i>
                                    Personnels
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/assurance" class="nav-link">
                                    <i class="fa-solid fa-house-crack"></i>
                                    Assurances
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/activite" class="nav-link">
                                    <i class="fa-regular fa-calendar-days"></i>
                                    Activites
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/tache" class="nav-link">
                                    <i class="fa-solid fa-list-check"></i>
                                    Taches
                                </router-link>
                            </li>
                        </ul>
                    </div>
    </nav>
</template>

<style>
.router-link-exact-active{
  background-color: rgb(32, 41, 68);
  color: aqua;
  border: none;
  border-left-width: 3px;
  border-left-style: solid;
  border-left-color: white;
}

.nav-link.router-link-active.router-link-exact-active{
  color: white;
  font-size: medium;
}
</style>