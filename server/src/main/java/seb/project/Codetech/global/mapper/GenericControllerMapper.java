package seb.project.Codetech.global.mapper;

public interface GenericControllerMapper<C, S> {
	C toControllerDto(S s);

	S toServiceDto(C c);
}
