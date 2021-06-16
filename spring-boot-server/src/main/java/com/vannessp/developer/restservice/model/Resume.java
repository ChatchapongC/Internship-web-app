package com.vannessp.developer.restservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "resumes"
//        , uniqueConstraints = {
//            @UniqueConstraint(columnNames = "email")
//    }
)
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private String firstname;

    @NotNull
    @Column
    private String lastname;

    //Date of birth
    @NotNull
    @Column
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dob;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;






}
