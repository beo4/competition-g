package competition.g

import competition.g.competition.Competition
import competition.g.competition.Race
import competition.g.competition.Sex
import competition.g.security.SecRole
import competition.g.security.SecUser
import competition.g.security.SecUserSecRole

class   BootStrap {

    def init = { servletContext ->

        if(!Competition.list()) {
            log.info "Creating event..."
            def event = new Competition(name: "Race Weekend").save()

            [[name: "Race 1", sex: Sex.Lady, event: event],
             [name: "Race 2", sex: Sex.Men, event: event],
             [name: "Race 3", sex: Sex.Lady, event: event]].each { props ->
                def race = new Race()
                race.properties = props
                race.save(flush: true)
            }

        }

        def userRole = SecRole.findByAuthority('ROLE_USER') ?: new SecRole(authority: 'ROLE_USER').save(failOnError: true)
        def adminRole = SecRole.findByAuthority('ROLE_ADMIN') ?: new SecRole(authority: 'ROLE_ADMIN').save(failOnError: true)

        def adminUser = SecUser.findByUsername('admin') ?: new SecUser(
                username: 'admin',
                password: 'admin',
                enabled: true).save(failOnError: true)

        if (!adminUser.authorities.contains(adminRole)) {
            SecUserSecRole.create adminUser, adminRole
        }
    }
    def destroy = {
    }
}
