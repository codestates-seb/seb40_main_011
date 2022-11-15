package seb.project.Codetech.file.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import seb.project.Codetech.file.entity.File;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
}
