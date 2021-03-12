const getJscode = function() {
    let jscode  = '';
    return function() {
        wx.login({
            success: (res) => {
                jscode = res.code;
            }
        })
    }
}

export const getcode = getJscode()