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

import AirConditioners from "@/views/devices/AirConditioner.vue";
import Alarms from "@/views/devices/Alarm.vue";
import Awnings from "@/views/devices/Awning.vue";
import Blinds from "@/views/devices/Blind.vue";
import Curtains from "@/views/devices/Curtain.vue";
import Doors from "@/views/devices/Door.vue";
import Fridges from "@/views/devices/Fridge.vue";
import Lights from "@/views/devices/Lights.vue";
import Ovens from "@/views/devices/Oven.vue";
import Speakers from "@/views/devices/Speaker.vue";
import Sprinklers from "@/views/devices/Sprinkler.vue";
import Taps from "@/views/devices/Tap.vue";
import Vacuums from "@/views/devices/Vacuum.vue";

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
  },//--------------------------------------------------------------------------
  {
    path: "/devices/air-conditioners",
    name: "AirConditioners",
    component: AirConditioners,
  },
  {
    path: "/devices/alarms",
    name: "Alarms",
    component: Alarms,
  },
  {
    path: "/devices/awnings",
    name: "Awnings",
    component: Awnings,
  },
  {
    path: "/devices/blinds",
    name: "Blinds",
    component: Blinds,
  },
  {
    path: "/devices/curtains",
    name: "Curtains",
    component: Curtains,
  },
  {
    path: "/devices/doors",
    name: "Doors",
    component: Doors,
  },
  {
    path: "/devices/fridges",
    name: "Fridges",
    component: Fridges,
  },
  {
    path: "/devices/lights",
    name: "Lights",
    component: Lights,
  },
  {
    path: "/devices/ovens",
    name: "Ovens",
    component: Ovens,
  },
  {
    path: "/devices/speakers",
    name: "Speakers",
    component: Speakers,
  },
  {
    path: "/devices/sprinklers",
    name: "Sprinklers",
    component: Sprinklers,
  },
  {
    path: "/devices/taps",
    name: "Taps",
    component: Taps,
  },
  {
    path: "/devices/vacuums",
    name: "Vacuums",
    component: Vacuums,
  },//----------------------------ADD-------------------------------------
  {
    path: "/add_device",
    name: "AddDevice",
    component: AddDevice,
  },
  {
    path: "/add_home",
    name: "AddHome",
    component: AddHome,
  },
  {
    path: "/add_routine",
    name: "AddRoutine",
    component: AddRoutine,
  },
  {
    path: "/rooms/add",
    name: "AddRoom",
    component: AddRoom,
  },//-------------------------------------------------------------------
  {
    path: "/devices/edit",
    name: "EditDevice",
    component: EditDevice,
  },
  {
    path: "/rooms/edit",
    name: "EditRoom",
    component: EditRoom,
  },
  {
    path: "/edit_home/:id",
    name: "EditHome",
    component: EditHome,
  },
  {
    path: "/edit_routine",
    name: "EditRoutine",
    component: EditRoutine,
  },//--------------------------------------------------------------
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

export default router;
