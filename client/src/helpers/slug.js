export const slug = (str) => {
    if (str) {
        //Convert upper case to lower case
        str = str.toLowerCase();
    
        //Delete marks
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
 
        //Delete special character
        str = str.replace(/([^0-9a-z-\s])/g, '');
 
        // delete dash character
        str = str.replace(/(\s+)/g, '-');
 
        // delete dash character at head
        str = str.replace(/^-+/g, '');
 
        // delete dash character at final
        str = str.replace(/-+$/g, '');
 
        // return
        return str;
    }
    return '';
}