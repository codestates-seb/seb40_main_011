package seb.project.Codetech.global.mapper;

public interface GenericServiceMapper<S, E> {
	S toServiceDto(E e);

	E toEntity(S s);
}
