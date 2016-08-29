const Pubsub = {
    topics: [],
    subscribe: function(topicName, method) {
        this.topics.push({
            topicName,
            method
        })
    },
    publish: function(topicName) {
        let params = Array.prototype.splice.call(arguments, 1)
        let methods = []
        this.topics.filter(topic => {
            if(topicName === topic.topicName) {
                methods.push(topic.method)
            }
        })
        methods.forEach(method => method.apply(null, params))
    }
}

export default Pubsub