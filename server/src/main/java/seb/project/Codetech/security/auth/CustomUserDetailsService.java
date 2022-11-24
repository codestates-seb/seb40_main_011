package seb.project.Codetech.security.auth;

import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.security.auth.utils.UserAuthorityUtils;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {
	private final UserRepository userRepository;
	private final UserAuthorityUtils authorityUtils;

	public CustomUserDetailsService(UserRepository userRepository, UserAuthorityUtils authorityUtils) {
		this.userRepository = userRepository;
		this.authorityUtils = authorityUtils;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> optionalUser = userRepository.findByEmail(username);
		User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
		if (findUser.getStatus()) {
			throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
		}

		return new UserPrincipal(findUser);
	}

	private final class UserPrincipal extends User implements UserDetails {
		UserPrincipal(User user) {
			setId(user.getId());
			setEmail(user.getEmail());
			setNickname(user.getNickname());
			setPassword(user.getPassword());
			setRoles(user.getRoles());
		}

		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			return authorityUtils.createAuthorities(this.getRoles());
		}

		@Override
		public String getUsername() {
			return getEmail();
		}

		@Override
		public boolean isAccountNonExpired() {
			return true;
		}

		@Override
		public boolean isAccountNonLocked() {
			return true;
		}

		@Override
		public boolean isCredentialsNonExpired() {
			return true;
		}

		@Override
		public boolean isEnabled() {
			return true;
		}
	}
}
