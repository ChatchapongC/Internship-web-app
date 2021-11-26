package com.vannessp.developer.restservice.controller;

import com.vannessp.developer.restservice.exception.BadRequestException;
import com.vannessp.developer.restservice.exception.ResourceNotFoundException;
import com.vannessp.developer.restservice.model.Candidate.FavoriteJob;
import com.vannessp.developer.restservice.model.Candidate.JobApplication;
import com.vannessp.developer.restservice.model.Candidate.Resume.*;
import com.vannessp.developer.restservice.model.Company.Job;
import com.vannessp.developer.restservice.model.User.User;
import com.vannessp.developer.restservice.model.Candidate.Candidate;
import com.vannessp.developer.restservice.payload.request.JobFilterRequest;
import com.vannessp.developer.restservice.payload.request.Resume.*;
import com.vannessp.developer.restservice.payload.request.UserProfileRequest;
import com.vannessp.developer.restservice.payload.response.ApiResponse;
import com.vannessp.developer.restservice.repository.*;
import com.vannessp.developer.restservice.repository.Resume.*;
import com.vannessp.developer.restservice.security.CurrentUser;
import com.vannessp.developer.restservice.security.UserPrincipal;
import com.vannessp.developer.restservice.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/candidate")
public class CandidateController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private FavoriteJobRepository favoriteJobRepository;

    @Autowired
    private UserServices userServices;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getProfile(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();
        return ResponseEntity.ok(candidate);
    }

    @PutMapping("/profile/update")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserProfileRequest userProfileRequest, @CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
        Candidate candidate = user.getCandidate();
        Candidate candidateUpdated = userServices.updateUserProfile(userProfileRequest, candidate);
        user.setCandidate(candidateUpdated);
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/apply-job/{id}")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> applyJob(@PathVariable Long id, @CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));

        if(jobApplicationRepository.existsByJobAndCandidate(job, candidate)) {
            throw new BadRequestException("You are already apply this job");
        }
        else {
            JobApplication jobApplication = new JobApplication();

            Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Europe/Madrid"));
            Date date = calendar.getTime();

            jobApplication.setJob(job);
            jobApplication.setCandidate(candidate);
            jobApplication.setApplyDate(date);
            jobApplicationRepository.save(jobApplication);

            return ResponseEntity.ok().body(new ApiResponse(true, "Apply job " + job.getTitle() + " success!"));
        }
    }

    @GetMapping("/job-history")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getJobApplyHistory(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();
        List<JobApplication> jobs = candidate.getJobApplications();
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/job-history/status/{cId}/{jId}")
    @PreAuthorize("hasRole('ROLE_CANDIDATE') or hasRole('ROLE_COMPANY')")
    public ResponseEntity<?> getJobApplyStatus(@PathVariable Long cId, @PathVariable Long jId){
        JobApplication jobApplication = jobApplicationRepository.findByCandidateIdAndJobId(cId, jId)
                .orElseThrow(() -> new BadRequestException("Job application error"));

        return ResponseEntity.ok(jobApplication);
    }


    @GetMapping("/resume")
    @PreAuthorize("hasRole('ROLE_CANDIDATE') or hasRole('ROLE_COMPANY')")
    public ResponseEntity<?> getResume(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error"));


        return ResponseEntity.ok(resume);
    }

    @GetMapping("/resume/{id}")
    @PreAuthorize("hasRole('ROLE_CANDIDATE') or hasRole('ROLE_COMPANY')")
    public ResponseEntity<?> getResumeById(@PathVariable Long id){
        Resume resume = resumeRepository.findByCandidateId(id)
                .orElseThrow(() -> new BadRequestException("Error"));

        return ResponseEntity.ok(resume);
    }


    @PutMapping("/resume/update")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> updateResume(@CurrentUser UserPrincipal userPrincipal, @RequestBody ResumeRequest resumeRequest){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error"));

        resume.setFirstName(candidate.getFirstName());
        resume.setLastName(candidate.getLastName());
        resume.setShortDescription(resumeRequest.getShortDescription());
        resume.setPositionTitle(resumeRequest.getPositionTitle());
        resumeRepository.save(resume);
        return ResponseEntity.ok(resume);
    }

    @PostMapping("/resume/education/create")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> createNewEducation(@CurrentUser UserPrincipal userPrincipal, @RequestBody EducationRequest educationRequest){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        Education newEducation = new Education();
        newEducation.setResume(resume);
        newEducation.setInstitute(educationRequest.getInstitute());
        newEducation.setEducationLevel(educationRequest.getEducationLevel());
        newEducation.setFromDate(educationRequest.getFromDate());
        newEducation.setToDate(educationRequest.getToDate());
        newEducation.setCurriculum(educationRequest.getCurriculum());
        newEducation.setGpa(educationRequest.getGpa());
        newEducation.setDescription(educationRequest.getDescription());
        educationRepository.save(newEducation);

        return ResponseEntity.ok(resume.getEducations());
    }

    @PutMapping("/resume/education/{id}/update")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> updateEducation(@CurrentUser UserPrincipal userPrincipal, @RequestBody EducationRequest educationRequest, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        Education education = educationRepository.findByIdAndResumeId(id, resume.getId())
                .orElseThrow(() -> new BadRequestException("Error education not found"));

        education.setInstitute(educationRequest.getInstitute());
        education.setEducationLevel(educationRequest.getEducationLevel());
        education.setFromDate(educationRequest.getFromDate());
        education.setToDate(educationRequest.getToDate());
        education.setCurriculum(educationRequest.getCurriculum());
        education.setGpa(educationRequest.getGpa());
        education.setDescription(educationRequest.getDescription());
        educationRepository.save(education);

        return ResponseEntity.ok(resume.getEducations());
    }

    @GetMapping("/resume/education")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getEducation(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error"));

        Set<Education> educationSet = resume.getEducations();
        return ResponseEntity.ok(educationSet);

    }

    @GetMapping("/resume/education/{id}")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getEducationById(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error"));

        Education education = educationRepository.findByIdAndResumeId(id, resume.getId())
                .orElseThrow(() -> new BadRequestException("Education Error"));
        return ResponseEntity.ok(education);

    }


    @DeleteMapping("/resume/education/{id}/delete")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> deleteEducation(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        return educationRepository.findByIdAndResumeId(id, resume.getId()).map(education -> {
            educationRepository.delete(education);
            return ResponseEntity.ok().body(new ApiResponse(true, "Delete education "+id+" successfully"));
        }).orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));

    }

    @PostMapping("/resume/skill/create")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> createNewSkill(@CurrentUser UserPrincipal userPrincipal, @RequestBody SkillRequest skillRequest){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        if(skillRequest.getSkillName().equals("")){
            throw new BadRequestException("Cant blank");
        }
        Skill newSkill = new Skill();
        newSkill.setResume(resume);
        newSkill.setSkillName(skillRequest.getSkillName());
        skillRepository.save(newSkill);

        return ResponseEntity.ok(resume.getSkills());
    }

    @PutMapping("/resume/skill/{id}/update")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> updateSkill(@CurrentUser UserPrincipal userPrincipal, @RequestBody SkillRequest skillRequest, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        Skill skill = skillRepository.findByIdAndResumeId(id, resume.getId())
                .orElseThrow(() -> new BadRequestException("Error education not found"));

        skill.setSkillName(skillRequest.getSkillName());
        skillRepository.save(skill);
        return ResponseEntity.ok(resume.getSkills());
    }

    @GetMapping("/resume/skill")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getSkill(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error"));

        List<Skill> skill = skillRepository.findByResumeId(resume.getId());


        return ResponseEntity.ok(skill);

    }

    @DeleteMapping("/resume/skill/{id}/delete")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> deleteSkill(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        return skillRepository.findByIdAndResumeId(id, resume.getId()).map(skill -> {
            skillRepository.delete(skill);
            return ResponseEntity.ok().body(new ApiResponse(true, "Delete skill "+id+" successfully"));
        }).orElseThrow(() -> new ResourceNotFoundException("Skill", "id", id));

    }

    @PostMapping("/resume/experience/create")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> createExperience(@CurrentUser UserPrincipal userPrincipal, @RequestBody ExperienceRequest experienceRequest){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        Experience experience = new Experience();
        experience.setResume(resume);
        experience.setCompanyName(experienceRequest.getCompanyName());
        experience.setCompanyName(experienceRequest.getCompanyName());
        experience.setFromDate(experienceRequest.getFromDate());
        experience.setToDate(experienceRequest.getToDate());
        experience.setTypeOfWork(experienceRequest.getTypeOfWork());
        experience.setDescription(experienceRequest.getDescription());
        experienceRepository.save(experience);
        return ResponseEntity.ok(resume.getExperiences());
    }

    @PutMapping("/resume/experience/{id}/update")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> updateExperience(@CurrentUser UserPrincipal userPrincipal, @RequestBody ExperienceRequest experienceRequest, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        Experience experience = experienceRepository.findByIdAndResumeId(id, resume.getId())
                .orElseThrow(() -> new BadRequestException("Error experience not found"));

        experience.setCompanyName(experienceRequest.getCompanyName());
        experience.setCompanyName(experienceRequest.getCompanyName());
        experience.setFromDate(experienceRequest.getFromDate());
        experience.setTypeOfWork(experienceRequest.getTypeOfWork());
        experience.setToDate(experienceRequest.getToDate());
        experience.setDescription(experienceRequest.getDescription());
        experienceRepository.save(experience);
        return ResponseEntity.ok(resume.getExperiences());
    }

    @GetMapping("/resume/experience")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getExperience(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error"));

        List<Experience> experiences = experienceRepository.findByResumeId(resume.getId());


        return ResponseEntity.ok(experiences);

    }

    @DeleteMapping("/resume/experience/{id}/delete")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> deleteExperience(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        return experienceRepository.findByIdAndResumeId(id, resume.getId()).map(experience -> {
            experienceRepository.delete(experience);
            return ResponseEntity.ok().body(new ApiResponse(true, "Delete experience "+id+" successfully"));
        }).orElseThrow(() -> new ResourceNotFoundException("Experience", "id", id));

    }

    @PostMapping("/resume/language/create")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> createLanguage(@CurrentUser UserPrincipal userPrincipal, @RequestBody LanguageRequest languageRequest){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        Language language = new Language();
        language.setResume(resume);
        language.setLanguageName(languageRequest.getLanguageName());
        language.setLevel(languageRequest.getLevel());
        languageRepository.save(language);
        return ResponseEntity.ok(resume.getLanguages());
    }

    @PutMapping("/resume/language/{id}/update")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> updateLanguage(@CurrentUser UserPrincipal userPrincipal, @RequestBody LanguageRequest languageRequest, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        Language language = languageRepository.findByIdAndResumeId(id, resume.getId())
                .orElseThrow(() -> new BadRequestException("Error Language not found"));
        language.setLanguageName(languageRequest.getLanguageName());
        language.setLevel(languageRequest.getLevel());
        languageRepository.save(language);
        return ResponseEntity.ok(resume.getExperiences());
    }

    @GetMapping("/resume/language")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getLanguage(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error"));

        List<Language> languages = languageRepository.findByResumeId(resume.getId());


        return ResponseEntity.ok(languages);

    }

    @DeleteMapping("/resume/language/{id}/delete")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> deleteLanguage(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long id){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();

        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("Error resume not found"));

        return languageRepository.findByIdAndResumeId(id, resume.getId()).map(language -> {
            languageRepository.delete(language);
            return ResponseEntity.ok().body(new ApiResponse(true, "Delete language "+id+" successfully"));
        }).orElseThrow(() -> new ResourceNotFoundException("Language", "id", id));

    }

//    @PostMapping
//    public ResponseEntity<List<Job>> filterCandidate(@RequestBody JobFilterRequest jobFilterRequest) {
//
//        List<Job> jobs = jobRepository.findJobByTypeAndCategoryAndLocation(
//                jobFilterRequest.getJobType(),
//                jobFilterRequest.getJobCategory(),
//                jobFilterRequest.getLocation()
//        );
//
//        if(jobs == null){
//            return ResponseEntity.notFound().build();
//        }
//
//        return ResponseEntity.ok().body(jobs);
//    }

    @GetMapping("/all")
    public ResponseEntity<?> candidateListing() {

        List<Candidate> candidates = candidateRepository.findAll();

        return ResponseEntity.ok().body(candidates);
    }


    @GetMapping("/favorite-job")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getFavoriteJob(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();
        List<FavoriteJob> favoriteJobs = candidate.getFavoriteJobs();
        return ResponseEntity.ok(favoriteJobs);
    }

    @GetMapping("/view-resume-count")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> getViewResumeCount(@CurrentUser UserPrincipal userPrincipal){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        Candidate candidate = user.getCandidate();
        Resume resume = resumeRepository.findByCandidateId(candidate.getId())
                .orElseThrow(() -> new BadRequestException("You are already favorite this job"));

        return ResponseEntity.ok(resume.getViewCount());
    }

    @PutMapping("/favorite-job/{jobId}")
    @PreAuthorize("hasRole('ROLE_CANDIDATE')")
    public ResponseEntity<?> updateFavoriteJob(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long jobId){
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));


        Candidate candidate = user.getCandidate();

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", jobId));

        if (favoriteJobRepository.existsByJobAndCandidate(job, candidate)) {
            throw new BadRequestException("You are already favorite this job");
        }
        else {
            FavoriteJob favoriteJob = new FavoriteJob();

            Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Europe/Madrid"));
            Date date = calendar.getTime();

            favoriteJob.setJob(job);
            favoriteJob.setCandidate(candidate);
            favoriteJob.setApplyDate(date);
            favoriteJobRepository.save(favoriteJob);

            return ResponseEntity.ok().body(new ApiResponse(true, "Favorite job " + job.getTitle() + " success!"));
        }

    }
}
