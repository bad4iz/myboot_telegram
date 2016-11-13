/**
 * Created by bad4iz on 12.11.16.
 *
 * ajax запрос
 *
 * dataUrl - откуда брать (адрес url)
 *
 * target - куда они попали (место в dom)
 *
 *
 */



function loadData(dataUrl, target){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >=200 && xhr.status < 300) || xhr.status === 304){
                target.inerHTML +=xhr.responseText;
            }else{
                console.log(xhr.statusText);
            }
        }

    };
    xhr.send();
}