# Spring Petclinic — First 100 Minutes

**D01 00:01–D01 01:40 (inclusive).** These are simulated minute markers. Git SHAs and surviving code lines are evidence-backed; terminal and typing actions are reconstructed.

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
- D01 00:01 — terminal: `mkdir spring-petclinic`
- D01 00:02 — terminal: `cd spring-petclinic`
- D01 00:03 — terminal: `git init -b main`

### 2. SPR-6447 SPR-6448 + commit the gross of the files + added maven pom
Real upstream commit: [521d01db950e](https://github.com/spring-projects/spring-petclinic/commit/521d01db950e357cf81ef78c50daf290e92b309c)

#### pom.xml — 1 attributed code lines · D01 00:05–D01 00:05

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
~~~

Code-line map:
- D01 00:05 — L1: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"

#### src/main/java/org/springframework/samples/petclinic/model/BaseEntity.java — 11 attributed code lines · D01 00:08–D01 00:19

~~~java

/**
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 */




}
~~~

Code-line map:
- D01 00:08 — L17: ""
- D01 00:09 — L25: "/**"
- D01 00:10 — L28: " *"
- D01 00:11 — L29: " * @author Ken Krebs"
- D01 00:12 — L30: " * @author Juergen Hoeller"
- D01 00:13 — L31: " */"
- D01 00:14 — L34: ""
- D01 00:15 — L38: ""
- D01 00:16 — L42: ""
- D01 00:17 — L50: ""
- D01 00:19 — L51: "}"

#### src/main/java/org/springframework/samples/petclinic/model/NamedEntity.java — 13 attributed code lines · D01 00:21–D01 00:34

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
- D01 00:21 — L17: ""
- D01 00:22 — L22: "/**"
- D01 00:23 — L25: " *"
- D01 00:24 — L26: " * @author Ken Krebs"
- D01 00:25 — L27: " * @author Juergen Hoeller"
- D01 00:26 — L29: " */"
- D01 00:27 — L31: "public class NamedEntity extends BaseEntity {"
- D01 00:28 — L32: ""
- D01 00:29 — L36: ""
- D01 00:30 — L40: ""
- D01 00:32 — L44: ""
- D01 00:33 — L50: ""
- D01 00:34 — L51: "}"

#### src/main/java/org/springframework/samples/petclinic/model/Person.java — 15 attributed code lines · D01 00:36–D01 00:51

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
- D01 00:36 — L17: ""
- D01 00:37 — L23: "/**"
- D01 00:38 — L24: " * Simple JavaBean domain object representing an person."
- D01 00:39 — L25: " *"
- D01 00:40 — L26: " * @author Ken Krebs"
- D01 00:41 — L27: " */"
- D01 00:42 — L29: "public class Person extends BaseEntity {"
- D01 00:44 — L30: ""
- D01 00:45 — L35: ""
- D01 00:46 — L40: ""
- D01 00:47 — L44: ""
- D01 00:48 — L48: ""
- D01 00:49 — L52: ""
- D01 00:50 — L56: ""
- D01 00:51 — L57: "}"

#### src/main/java/org/springframework/samples/petclinic/owner/Owner.java — 12 attributed code lines · D01 00:54–D01 01:06

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
- D01 00:54 — L17: ""
- D01 00:55 — L22: "import org.springframework.core.style.ToStringCreator;"
- D01 00:56 — L25: ""
- D01 00:58 — L38: "/**"
- D01 00:59 — L39: " * Simple JavaBean domain object representing an owner."
- D01 01:00 — L40: " *"
- D01 01:01 — L41: " * @author Ken Krebs"
- D01 01:02 — L42: " * @author Juergen Hoeller"
- D01 01:03 — L43: " * @author Sam Brannen"
- D01 01:04 — L47: " */"
- D01 01:05 — L50: "public class Owner extends Person {"
- D01 01:06 — L188: "}"

#### src/main/java/org/springframework/samples/petclinic/owner/Pet.java — 12 attributed code lines · D01 01:08–D01 01:20

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
- D01 01:08 — L17: ""
- D01 01:09 — L25: ""
- D01 01:11 — L36: "/**"
- D01 01:12 — L38: " *"
- D01 01:13 — L39: " * @author Ken Krebs"
- D01 01:14 — L40: " * @author Juergen Hoeller"
- D01 01:15 — L41: " * @author Sam Brannen"
- D01 01:16 — L43: " */"
- D01 01:17 — L46: "public class Pet extends NamedEntity {"
- D01 01:18 — L47: ""
- D01 01:19 — L84: ""
- D01 01:20 — L85: "}"

#### src/main/java/org/springframework/samples/petclinic/owner/Visit.java — 9 attributed code lines · D01 01:23–D01 01:31

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
- D01 01:23 — L17: ""
- D01 01:24 — L29: "/**"
- D01 01:25 — L30: " * Simple JavaBean domain object representing a visit."
- D01 01:26 — L31: " *"
- D01 01:27 — L32: " * @author Ken Krebs"
- D01 01:28 — L34: " */"
- D01 01:29 — L37: "public class Visit extends BaseEntity {"
- D01 01:30 — L38: ""
- D01 01:31 — L70: "}"

#### src/main/java/org/springframework/samples/petclinic/vet/Vet.java — 6 attributed code lines · D01 01:34–D01 01:40

~~~java

/**
 * Simple JavaBean domain object representing a veterinarian.
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
~~~

Code-line map:
- D01 01:34 — L17: ""
- D01 01:35 — L35: "/**"
- D01 01:37 — L36: " * Simple JavaBean domain object representing a veterinarian."
- D01 01:38 — L37: " *"
- D01 01:39 — L38: " * @author Ken Krebs"
- D01 01:40 — L39: " * @author Juergen Hoeller"

#### Development actions (18)
- D01 00:04 — terminal: `touch 'pom.xml'`
- D01 00:06 — terminal: `mkdir -p 'src/main/java/org/springframework/samples/petclinic/model'`
- D01 00:07 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/model/BaseEntity.java'`
- D01 00:18 — save: Save editor buffer · reconstructed
- D01 00:20 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/model/NamedEntity.java'`
- D01 00:31 — save: Save editor buffer · reconstructed
- D01 00:35 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/model/Person.java'`
- D01 00:43 — save: Save editor buffer · reconstructed
- D01 00:52 — terminal: `mkdir -p 'src/main/java/org/springframework/samples/petclinic/owner'`
- D01 00:53 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/owner/Owner.java'`
- D01 00:57 — save: Save editor buffer · reconstructed
- D01 01:07 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/owner/Pet.java'`
- D01 01:10 — save: Save editor buffer · reconstructed
- D01 01:21 — save: Save editor buffer · reconstructed
- D01 01:22 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/owner/Visit.java'`
- D01 01:32 — terminal: `mkdir -p 'src/main/java/org/springframework/samples/petclinic/vet'`
- D01 01:33 — terminal: `touch 'src/main/java/org/springframework/samples/petclinic/vet/Vet.java'`
- D01 01:36 — save: Save editor buffer · reconstructed

## Verification
- Exactly 100 timeline actions, from global step 1 through step 100.
- All source lines are printed with the corresponding pinned final-file line numbers.
- Git commit SHAs are genuine upstream provenance; intra-commit typing order is reconstructed.
- No assumption is made that a file was runnable before all dependencies were present.
