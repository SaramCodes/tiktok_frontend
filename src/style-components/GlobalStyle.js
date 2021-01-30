import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body{
    padding-bottom: 50px;
}

a{
    text-decoration: none;
}

ul{
    list-style: none
}

.primary-button{
    transition-duration: 0.3s;
    padding: 10px 50px;
    background-color: #fe2c55;
    border: none;
    outline: none;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    &:hover{
        background: #de264a;
    }
}

.secondary-button{
    transition-duration: 0.3s;
    border: 1px solid #fe2c55;
    padding: 10px 50px;
    background-color: #fff;
    color: #fe2c55;
    font-size: 20px; ;
    cursor: pointer;
    user-select: none;
    &:hover{
        background: #eee;
    }
}

.button-small{
    padding: 5px 20px;
    font-size: 16px;
    font-weight: 500;
}
.container{
    width: 80%;
    margin: auto;
    max-width: 1600px;
}

header{
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
}
.navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    .branding{
        font-size: 30px;
        font-weight: 700;
        color:#000;

    }
    ul{
        display: flex;
        align-items: center;
        li{
            a, span{
                margin-right: 40px;
                
            }
            &:nth-last-child(1){
                a, span{
                    margin-right: 0;
                }
            }

            .link{
                font-weight:700;
                color: #000;
                cursor: pointer;
            }

        }
    }
    .upload{
        display: flex;
        svg{
            font-size:30px;
            color: #000;    
        }
    }
}

.link-navbar-mugshot{
    display: block;
    background: #fe2c55;
    border-radius: 50%;
    position: relative;
    .name{
        height: 100%;
        width: 100%;
        justify-content: center;
        display: flex;
        align-items: center;
        position:absolute;
        color: #fff;
        font-size: 12px;
    }
}

.navbar-mugshot{
    z-index: 1;
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

/* ***************************FEED PAGE***************************** */
.feed-page{
    display: flex;

}

.feed-custom{
    flex-basis: 300px;
    flex-shrink: 0;
}

.feed-custom-links{
    width: 70%;
}

.feed-main{
    flex-grow: 1;
}

.feed-custom-link{
    margin-bottom: 5px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    font-size:25px;
    font-weight: 500;
    &:hover{
        background-color: #eee;
    }

    svg{
        margin-right: 10px;
    }
}

.feed-custom-link-active{
    font-weight: 700;
    color: #fe2c55;
}

 
.post{
    margin-bottom: 50px;
}
.post-info-container{
    display: flex;
}

.post-mugshot-container{
    flex-basis: 90px;
    flex-shrink:0;
    align-self: flex-start;
    .post-mugshot{
        display: block;
        height: 70px;
        width: 70px;
        background-repeat: none;
        background-size: cover;
        border-radius: 50%;
    }
}

.post-user-info-container{
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
}

.post-follow{
    align-self: center;
}

.post-video-container{
    display: flex;
    align-items: flex-end;
}

.video-empty{
    flex-basis: 90px;
    flex-shrink:0;
}

video{
    border-radius: 10px;
    max-width: 250px;
}

.post-side-links{
    margin-left: 15px;
    text-align: center;
}

.post-side-link-container{
    margin-bottom: 20px;
    &:nth-last-child(1){
        margin-bottom: 0;
    }
}

.post-side-link{
    height: 50px;
    width: 50px;
    background: #eee;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    svg{
        font-size: 25px;
        color: #000;
    }
    &:hover{
        svg{
            color: #fe2c55;
        }
    }
}


/* ***************************FEED PAGE***************************** */

/* ***************************REGISTER PAGE***************************** */
.card-container{
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.3);
    padding: 50px;
}

.lg-heading{
    font-size: 50px;
    position: relative;
    margin-bottom: 50px;
    &:after{
        content: '';
        height: 5px;
        z-index: -1;
        width: 10%;
        background: #fe2c55;
        border-radius: 20px;
        bottom: 5px;
        position: absolute;
        left: 0;
    }
 
}



.field-flex{
    display: flex;
    justify-content: space-between;
}

.field-container{
    flex-basis: 48%;
    position: relative;
    margin-bottom: 50px;
    label{
        position:absolute;
        top: 0;
        left: 10px;
        background: #fff;
        transform: translateY(-50%);
        font-size: 13px;
        font-weight: 500;
        color: #fe2c55;
    }

    .field-required{
        &:after{
            content: "*";
            position: absolute;
            right: -10px;
            top: -2px;
            color: red;
            font-weight: 700;
        }
    }

    input{
        display: block;
        height: 50px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 5px 10px;
        font-size: 16px;
        &:focus{
            border: 2px solid #fe2c55;
            outline: none;
        }
    }

    
}

.field-error{
        color: red;
        font-size: 13px;
        font-weight: 700;
        margin: 0;

}

.form-error{
    margin-top: -30px;
    margin-bottom: 20px;
}


/* ***************************REGISTER PAGE***************************** */

/* ***************************POPUP***************************** */
.popup-overlay{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.popup{
    height: 300px;
    width: 600px;
    background: #fff;
    animation-name: popup;
    animation-duration: 0.3s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    .popup-top{
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
        span{
            background: #fe2c55;
            height: 50px;
            width: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: #fff;
            cursor: pointer;

        }
    }
    .popup-main{
        padding: 50px 15px;
        text-align: center;
        h3{
            font-size: 30px;
            margin-bottom: 15px;
        }
        span{
            display: inline-block;
            font-size: 50px;
            background: #00cf60;
            height: 70px;
            line-height:80px;
            width: 70px;
            border-radius: 50%;
            color: #fff;
        }
    }
}

.btn-spinner{
    padding: 0 20px;
    svg{
        animation-fill-mode: forwards;
        animation-name: spin;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }
}
/* ***************************POPUP***************************** */

/* ***************************PROFILE PAGE***************************** */

.empty{
    display: block;
    text-align: center;
    color: #aaa;
    font-weight: 700;
    font-size: 40px;
}

.profile-info{
    display: flex;
    margin-bottom: 50px;
}

.profile-mugshot{
    height: 150px;
    width: 150px;
    flex-basis: 150px;
    flex-shrink: 0;
    border-radius: 50%;
    margin-right: 20px;
    background: #fe2c55;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    span{
        font-size: 20px;
        font-weight: 700;
        color: #fff;
    }
    .profile-mugshot-inner{
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}

.profile-details{
    .profile-user-name-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .profile-user-name-container{
            font-size: 35px;
        }
    }
}

.profile-navigation{
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    .profile-navigation-btn{
        cursor: pointer;
        user-select: none;
        font-size: 18px;
        font-weight: 500;
        margin-right: 20px;
        position: relative;
        color: #000;
        &:after{
            height:4px;
            transition-duration: 0.3s;
            width: 100%;
            position: absolute;
            bottom: -10px;
            left: 0;
            background: #fe2c55;
            content: '';
            transform-origin: center bottom;
            transform: scaleY(0);
        }
    }
    
    .profile-navigation-btn-active{
        &:after{
            transform: scaleY(1);
        }
    }
}

.video-container{
    display: flex;
    flex-wrap: wrap;
    .video{
        margin: 20px 20px 20px 0;
        flex-basis: 190px;
        width: 190px;
        video{
            max-width: 100%;
        }
    }
}

.users-container{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    .user{
        text-decoration: none;
        margin: 20px 0 20px 0;
        flex-basis: 20%;
        flex-shrink: 0;
        a{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            .mugshot{
                height: 80px;
                width: 80px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                border-radius: 50%;
                margin-bottom: 10px;
            }
            h3{
                font-size: 15px;
                color: #000;
                font-weight: 500;
            }
            &:hover{
                h3{
                    color: #fe2c55;
                }
            }
        }
    }
}

.about-container{
    h3{
        font-size: 30px;
        text-transform: capitalize;
        margin-bottom: 10px;
    }
    p{
        font-size: 18px;
    }
}

/* ***************************PROFILE PAGE***************************** */

/* ***************************ANIMATIONs***************************** */
@keyframes popup{
    from {
        transform: scale(0);
    } to{
        transform: scale(1);
    }
}
@keyframes spin{
    from {
        transform: rotate(0);
    } to{
        transform: rotate(360deg);
    }
}

/* ***************************ANIMATIONs***************************** */


`

export default GlobalStyle;