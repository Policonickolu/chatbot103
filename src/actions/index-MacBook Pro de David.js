const actions = {
    'most-starred': require('./most-starred'),
    'most-forked': require('./most-forked'),
    'show-languages': require('./show-languages'),
    'laugh': require('./laugh'),
    'get-started': require('./get-started'),
    'exercise': require('./exercise'),
    'exercise-type': require('./exercise-type'),
    'diet': require('./diet'),
    'diet-type': require('./diet-type'),
    'greetings': require('./greetings'),
    'sex': require('./sex'),
    'goals-type': require('./goals-type'),
}


export default async function handleAction(res, payload) {
    const currentAction = res.action && res.action.slug
    console.log(currentAction)
    let replies = []
    if (actions[currentAction]) {
        console.log('Enter action')
        replies = await actions[currentAction].default(res, payload)
    } else if (res.reply()) {
        replies.push({
            type: 'text',
            content: res.reply(),
        })
    } else {
        replies.push({
            type: 'text',
            content: 'Désolé, je n\'ai pas compris',
        })
    }
    return replies
}