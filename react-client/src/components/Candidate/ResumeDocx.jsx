import React, { useState, useEffect } from 'react';
import { getResume } from '../../api/CandidateAPI';
import {
    AlignmentType,
    Document,
    HeadingLevel,
    Packer,
    Paragraph,
    TabStopPosition,
    TabStopType,
    TextRun
} from "docx";
import { saveAs } from 'file-saver'
import Moment from 'moment';

Moment.locale('th');

export function generateDocument(props, resume) {
    console.log(resume)
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        text: `${props.currentUser.candidate.firstName} ${props.currentUser.candidate.lastName}`,
                        heading: HeadingLevel.TITLE
                    }),
                    createPositionTiltle(resume.positionTitle),
                    createContactInfo(props.currentUser.candidate.mobileNumber,
                        props.currentUser.candidate.email,
                        props.currentUser.candidate.address),

                    createHeading("PROFILE"),
                    createProfileDescription(resume.shortDescription),
                    createHeading("EDUCATION"),
                    ...resume.educations
                        .map((education) => {
                            const arr = [];
                            arr.push(
                                createInstitutionHeader(
                                    education.institute,
                                    `${Moment(education.fromDate).format('YYYY')} - ${Moment(education.toDate).format('YYYY')}`
                                )
                            );
                            arr.push(
                                createRoleText(
                                    `${education.curriculum} - ${education.gpa}`
                                )
                            );
                            const bulletPoints = splitParagraphIntoBullets(
                                education.description
                            );
                            bulletPoints.forEach(bulletPoint => {
                                arr.push(createBullet(bulletPoint));
                            });

                            return arr;
                        })
                        .reduce((prev, curr) => prev.concat(curr), []),
                    createHeading("EXPERIENCE"),
                    ...resume.experiences
                        .map((position) => {
                            const arr = [];

                            arr.push(
                                createInstitutionHeader(
                                    position.companyName,
                                    createPositionDateText(
                                        position.fromDate,
                                        position.toDate,
                                    )
                                )
                            );
                            arr.push(createRoleText(position.typeOfWork));

                            const bulletPoints = splitParagraphIntoBullets(
                                position.description
                            );

                            bulletPoints.forEach(bulletPoint => {
                                arr.push(createBullet(bulletPoint));
                            });

                            return arr;
                        })
                        .reduce((prev, curr) => prev.concat(curr), []),
                    createHeading("SKILLS and LANGUAGE"),
                    createSubHeading("Skills"),
                    ...createSkillList(resume.skills),
                    createSubHeading("Languages"),
                    ...createLanguageList(resume.languages),
                ]
            }
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, "resume.docx");
        console.log("Document created successfully");
    });

}

function createPositionTiltle(
    positionTitle
) {
    return new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
            new TextRun(
                `| ${positionTitle}`
            )
        ]
    });
}

function createProfileDescription(
    description
) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun(
                `${description}`
            ) 
        ]
    });

}

function createContactInfo(
    phoneNumber,
    email,
    address
) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun(
                `Mobile: ${phoneNumber} | Email: ${email}`
            ),
            new TextRun({
                text: `Address : ${address}`,
                break: 1
            })
        ]
    });
}

function createHeading(text) {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true
    });
}

function createSubHeading(text) {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2
    });
}

function createInstitutionHeader(
    institutionName,
    dateText
) {
    return new Paragraph({
        tabStops: [
            {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX
            }
        ],
        children: [
            new TextRun({
                text: institutionName,
                bold: true
            }),
            new TextRun({
                text: `\t${dateText}`,
                bold: true
            })
        ]
    });
}

function createRoleText(roleText) {
    return new Paragraph({
        children: [
            new TextRun({
                text: roleText,
                italics: true
            })
        ]
    });
}

function splitParagraphIntoBullets(text) {
    return text.split("\n\n");
}

function createBullet(text) {
    return new Paragraph({
        text: text,
        bullet: {
            level: 0
        }
    });
}

function createPositionDateText(
    startDate,
    endDate,
) {
    return `${Moment(startDate).format('MMMM DD,yyyy')} - ${Moment(endDate).format('MMMM DD,yyyy')}`;
}

function createSkillList(skills) {
    return skills.map(
        (skill) =>
            new Paragraph({
                text: `${skill.skillName}`,
                bullet: {
                    level: 0
                }
            })
    );
}

function createLanguageList(languages) {
    return languages.map(
        (language) =>
            new Paragraph({
                text: `${language.languageName} Level: ${language.level}`,
                bullet: {
                    level: 0
                }
            })
    );
}


