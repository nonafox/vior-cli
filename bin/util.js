import fs from 'fs'

export default {
    delDir(path) {
        let arr = fs.readdirSync(path)
        for (let k in arr) {
            let v = path + '/' + arr[k]
            if (fs.statSync(v).isDirectory()) {
                this.delDir(v)
            } else {
                fs.unlinkSync(v)
            }
        }
    },
    isQuote(text, k) {
        return (text[k] == `'` || text[k] == `"` || text[k] == '`') && text[k - 1] != '\\'
    },
    scriptReplace(_script, regexp, replace) {
        let script = _script.split(''), quoteStarter = null, addup = ''
        
        let reps = [], repsid = -1
        for (let k in script) {
            k = parseInt(k)
            let v = script[k]
            if (! quoteStarter) {
                if (! this.isQuote(script, k)) {
                    addup += v
                } else {
                    quoteStarter = v
                    repsid += 1
                    reps[repsid] = ''
                    addup += quoteStarter + '[[[#{{{' + repsid + '}}}#]]]'
                }
            } else {
                if (this.isQuote(script, k) && v == quoteStarter) {
                    addup += v
                    quoteStarter = null
                } else {
                    reps[repsid] += v
                }
            }
        }
        
        addup = addup.replace(regexp, replace)
        for (let k in reps) {
            let v = reps[k]
            addup = addup.replace('[[[#{{{' + k + '}}}#]]]', v)
        }
        
        return addup
    }
}