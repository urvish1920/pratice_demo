import React from "react";
import Search from "./components/Search/Search";
import Styles from './globals.module.css'

export default async function Home() {
  return (
    <div className={Styles.home}>
      <span className={Styles.homeheading}>Choose Your Perfect Ride Partner</span>
      <h1 className={Styles.h1}>Looking For<br />A Ride</h1>
      <Search />
  </div>
  );
}
