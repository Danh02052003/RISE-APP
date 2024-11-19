import React from 'react'
import Search from './Search.js';

function HeaderDB(){
    return (
        <div className="header">
          <Search />
            {/* User actions */}
            <div className="user-actions">
                <div className="button-actions-user">
                    <button className="search-mess-img">
                        <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/mess.svg`} alt="mess" />
                    </button>
                    <button className="search-favorite-img">
                        <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/heart.svg`} alt="favor" />
                    </button>
                    <button className="search-notification-img">
                        <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/notification.svg`} alt="notification" />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default HeaderDB;
