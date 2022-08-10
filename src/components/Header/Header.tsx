import { FC } from "react";
import { BankMainIcon } from "../../icons";
import "./Header.css";

export const Header: FC = () => {
  const navArr: string[] = ["About us", "Latest news", "FAQ"];
  return (
    <header className="header">
      <div className="headerContainer">
        <BankMainIcon />
        <div className="headerNav">
          {navArr.map((item, index) => (
            <a key={index + item} className="headerNavLink">
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};
