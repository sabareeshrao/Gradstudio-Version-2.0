# Spring Petclinic — First 100 Minutes

**D01 09:00–10:39 (inclusive).** These are simulated minute markers. Git SHAs and surviving code lines are evidence-backed; terminal and typing actions are reconstructed.

Source SHA: 500158f732419217507c7656904b8e6aa1bcc0d6

| Event type | Count |
|---|---:|
| terminal | 14 |
| add | 79 |
| save | 7 |

## Features and exact code lines

### 1. Project setup
No upstream commit assigned to setup

#### Development actions (3)
- D01 09:00 — terminal: `mkdir spring-petclinic`
- D01 09:01 — terminal: `cd spring-petclinic`
- D01 09:02 — terminal: `git init -b main`

### 2. SPR-6447 SPR-6448 + commit the gross of the files + added maven pom
Real upstream commit: [521d01db950e](https://github.com/spring-projects/spring-petclinic/commit/521d01db950e357cf81ef78c50daf290e92b309c)

#### pom.xml — 1 attributed code lines · D01 09:04–D01 09:04

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
~~~

Code-line map:
- D01 09:04 — L1: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"

#### src/main/java/org/springframework/samples/petclinic/model/BaseEntity.java — 11 attributed code lines · D01 09:07–D01 09:18

~~~java

/**
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */




}
~~~

Code-line map:
- D01 09:07 — L17: ""
- D01 09:08 — L25: "/**"
- D01 09:09 — L28: " *"
- D01 09:10 — L29: " * @author Ken Krebs"
- D01 09:11 — L30: " * @author Juergen Hoeller"
- D01 09:12 — L31: " */"
- D01 09:13 — L34: ""
- D01 09:14 — L38: ""
- D01 09:15 — L42: ""
- D01 09:16 — L50: ""
- D01 09:18 — L51: "}"

#### src/main/java/org/springframework/samples/petclinic/model/NamedEntity.java — 13 attributed code lines · D01 09:20–D01 09:33

~~~java

/**
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */
public class NamedEntity extends BaseEntity {





}
~~~

Code-line map:
- D01 09:20 — L17: ""
- D01 09:21 — L22: "/**"
- D01 09:22 — L25: " *"
- D01 09:23 — L26: " * @author Ken Krebs"
- D01 09:24 — L27: " * @author Juergen Hoeller"
- D01 09:25 — L29: " */"
- D01 09:26 — L31: "public class NamedEntity extends BaseEntity {"
- D01 09:27 — L32: ""
- D01 09:28 — L36: ""
- D01 09:29 — L40: ""
- D01 09:31 — L44: ""
- D01 09:32 — L50: ""
- D01 09:33 — L51: "}"

#### src/main/java/org/springframework/samples/petclinic/model/Person.java — 15 attributed code lines · D01 09:35–D01 09:50

~~~java

/**
 * Simple JavaBean domain object representing an person.
 *
 * @author Ken Krebs
 */
public class Person extends BaseEntity {







}
~~~

Code-line map:
- D01 09:35 — L17: ""
- D01 09:36 — L23: "/**"
- D01 09:37 — L24: " * Simple JavaBean domain object representing an person."
- D01 09:38 — L25: " *"
- D01 09:39 — L26: " * @author Ken Krebs"
- D01 09:40 — L27: " */"
- D01 09:41 — L29: "public class Person extends BaseEntity {"
- D01 09:43 — L30: ""
- D01 09:44 — L35: ""
- D01 09:45 — L40: ""
- D01 09:46 — L44: ""
- D01 09:47 — L48: ""
- D01 09:48 — L52: ""
- D01 09:49 — L56: ""
- D01 09:50 — L57: "}"

#### src/main/java/org/springframework/samples/petclinic/owner/Owner.java — 12 attributed code lines · D01 09:53–D01 10:05

~~~java

import org.springframework.core.style.ToStringCreator;

/**
 * Simple JavaBean domain object representing an owner.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
public class Owner extends Person {
}
~~~

Code-line map:
- D01 09:53 — L17: ""
- D01 09:54 — L22: "import org.springframework.core.style.ToStringCreator;"
- D01 09:55 — L25: ""
- D01 09:57 — L38: "/**"
- D01 09:58 — L39: " * Simple JavaBean domain object representing an owner."
- D01 09:59 — L40: " *"
- D01 10:00 — L41: " * @author Ken Krebs"
- D01 10:01 — L42: " * @author Juergen Hoeller"
- D01 10:02 — L43: " * @author Sam Brannen"
- D01 10:03 — L47: " */"
- D01 10:04 — L50: "public class Owner extends Person {"
- D01 10:05 — L188: "}"

#### src/main/java/org/springframework/samples/petclinic/owner/Pet.java — 12 attributed code lines · D01 10:07–D01 10:19

~~~java


/**
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 */
public class Pet extends NamedEntity {


}
~~~

Code-line map:
- D01 10:07 — L17: ""
- D01 10:08 — L25: ""
- D01 10:10 — L36: "/**"
- D01 10:11 — L38: " *"
- D01 10:12 — L39: " * @author Ken Krebs"
- D01 10:13 — L40: " * @author Juergen Hoeller"
- D01 10:14 — L41: " * @author Sam Brannen"
- D01 10:15 — L43: " */"
- D01 10:16 — L46: "public class Pet extends NamedEntity {"
- D01 10:17 — L47: ""
- D01 10:18 — L84: ""
- D01 10:19 — L85: "}"

#### src/main/java/org/springframework/samples/petclinic/owner/Visit.java — 9 attributed code lines · D01 10:22–D01 10:30

~~~java

/**
 * Simple JavaBean domain object representing a visit.
 *
 * @author Ken Krebs
 */
public class Visit extends BaseEntity {

}
~~~

Code-line map:
- D01 10:22 — L17: ""
- D01 10:23 — L29: "/**"
- D01 10:24 — L30: " * Simple JavaBean domain object representing a visit."
- D01 10:25 — L31: " *"
- D01 10:26 — L32: " * @author Ken Krebs"
- D01 10:27 — L34: " */"
- D01 10:28 — L37: "public class Visit extends BaseEntity {"
- D01 10:29 — L38: ""
- D01 10:30 — L70: "}"

#### src/main/java/org/springframework/samples/petclinic/vet/Vet.java — 6 attributed code lines · D01 10:33–D01 10:39

~~~java

/**
 * Simple JavaBean domain object representing a veterinarian.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
~~~

Code-line map:
- D01 10:33 — L17: ""
- D01 10:34 — L35: "/**"
- D01 10:36 — L36: " * Simple JavaBean domain object representing a veterinarian."
- D01 10:37 — L37: " *"
- D01 10:38 — L38: " * @author Ken Krebs"
- D01 10:39 — L39: " * @author Juergen Hoeller"

#### Development actions (18)
- D01 09:03 — terminal: `touch 'pom.xml'`
- D01 09:05 — terminal: `mkdir -p 'src/main/java/org/springframework/samples/petclinic/model'`
- D01 09:06 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/model/BaseEntity.java'`
- D01 09:17 — save: Save editor buffer · reconstructed
- D01 09:19 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/model/NamedEntity.java'`
- D01 09:30 — save: Save editor buffer · reconstructed
- D01 09:34 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/model/Person.java'`
- D01 09:42 — save: Save editor buffer · reconstructed
- D01 09:51 — terminal: `mkdir -p 'src/main/java/org/springframework/samples/petclinic/owner'`
- D01 09:52 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/owner/Owner.java'`
- D01 09:56 — save: Save editor buffer · reconstructed
- D01 10:06 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/owner/Pet.java'`
- D01 10:09 — save: Save editor buffer · reconstructed
- D01 10:20 — save: Save editor buffer · reconstructed
- D01 10:21 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/owner/Visit.java'`
- D01 10:31 — terminal: `mkdir -p 'src/main/java/org/springframework/samples/petclinic/vet'`
- D01 10:32 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/vet/Vet.java'`
- D01 10:35 — save: Save editor buffer · reconstructed

## Verification
- Exactly 100 timeline actions, from global step 1 through step 100.
- All source lines are printed with the corresponding pinned final-file line numbers.
- Git commit SHAs are genuine upstream provenance; intra-commit typing order is reconstructed.
- No assumption is made that a file was runnable before all dependencies were present.
