package competition.g.competition

import grails.rest.Resource

@Resource(uri="/api/race, formats=['json']")
class Race {

    String name
    Sex sex;


    static belongsTo = [event: Competition]

    static constraints = {

    }
}
