package competition.g.competition

import grails.rest.Resource

@Resource(uri='/api/competition', formats=['json'])
@Secured('ROLE_ADMIN')
class Competition {

    String name;



    static hasMany = [races:Race]

    static constraints = {
        races nullable: true
    }
}
