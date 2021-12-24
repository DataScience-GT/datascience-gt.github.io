var mobile;
function mobileCheck()
{
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    {
        mobile();
        mobile = true;
    }
    else
    {
        desktop();
        mobile = false;
    }
}

function desktop()
{
    var desktop = document.getElementById("desktopDIV");
    var desktopSpon = document.getElementById("desktopSponsors");
    var mobile = document.getElementById("mobileDIV")
    var mobileSpon = document.getElementById("mobileSponsors")

    desktop.style.display = "block";
    if(!(desktopSpon === null))
    {
        desktopSpon.style.display = "flex";
    }
    
    mobile.style.display = "none";
    if(!(mobileSpon === null))
    {
        mobileSpon.style.display = "none";
    }
    //alert("desktop");
}

function mobile()
{
    var desktop = document.getElementById("desktopDIV");
    var desktopSpon = document.getElementById("desktopSponsors");
    var mobile = document.getElementById("mobileDIV")
    var mobileSpon = document.getElementById("mobileSponsors")

    desktop.style.display = "none";
    if(!(desktopSpon === null))
    {
        desktopSpon.style.display = "none";
    }

    mobile.style.display = "block";
    if(!(mobileSpon === null))
    {
        mobileSpon.style.display = "block";
    }
    //alert("mobile");
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


