import Vue from "vue";
import VueRouter from "vue-router";

import Favourites from "@/views/Favourites.vue";
import Homes from "@/views/Homes.vue";
import Rooms from "@/views/Rooms.vue";
import Devices from "@/views/Devices.vue";
import Routines from "@/views/Routines.vue";

import ElecCons from "@/views/ElecCons.vue";
import History from "@/views/History.vue";
import Settings from "@/views/Settings.vue";
import HelpFeed from "@/views/HelpFeed.vue";
import ErrorLog from "@/views/ErrorLog.vue";

import Device from "@/views/Device.vue";

import AddDevice from "@/views/AddDevice.vue";
import AddHome from "@/views/AddHome.vue";
import AddRoutine from "@/views/AddRoutine.vue"
import AddRoom from "@/views/AddRoom.vue"

import EditDevice from "@/views/EditDevice.vue";
import EditHome from "@/views/EditHome.vue";
import EditRoutine from "@/views/EditRoutine.vue";
import EditRoom from "@/views/EditRoom.vue";

import Room from "@/views/Room.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/favourites",
    name: "Favourites",
    component: Favourites,
  },
  {
    path: "/homes",
    name: "Homes",
    component: Homes,
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: Rooms,
  },
  {
    path: "/devices",
    name: "Devices",
    component: Devices,
  },
  {
    path: "/routines",
    name: "Routines",
    component: Routines,
  },//--------------------------------------------------------------------
  {
    path: "/eleccons",
    name: "ElecCons",
    component: ElecCons,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/helpfeed",
    name: "HelpFeed",
    component: HelpFeed,
  },
  {
    path: "/errorlog",
    name: "ErrorLog",
    component: ErrorLog,
  },
  //----------------------------ADD-------------------------------------
  {
    path: "/devices/add",
    name: "AddDevice",
    component: AddDevice,
  },
  {
    path: "/homes/add",
    name: "AddHome",
    component: AddHome,
  },
  {
    path: "/routines/add",
    name: "AddRoutine",
    component: AddRoutine,
  },
  {
    path: "/rooms/add",
    name: "AddRoom",
    component: AddRoom,
  },//-------------------------------------------------------------------
  {
    path: "/devices/:id/edit",
    name: "EditDevice",
    component: EditDevice,
  },
  {
    path: "/rooms/:id/edit",
    name: "EditRoom",
    component: EditRoom,
  },
  {
    path: "/homes/:id/edit",
    name: "EditHome",
    component: EditHome,
  },
  {
    path: "/routines/:id/edit",
    name: "EditRoutine",
    component: EditRoutine,
  },
  //--------------------------------------------------------------------------
  {
    path: "/devices/:typeName",
    name: "Device",
    component: Device
  },
  //--------------------------------------------------------------
  {
    path: "/rooms/:id",
    name: "Room",
    component: Room,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.replace({ path: '/homes', redirect: '/' })

export default router;
